import { useEffect, useState } from "react";

import type { Note } from "../types/notes";
import { getNotesForUser, saveNotes } from "../data/storage";

export const useNotes = (userId: string) => {
    const [notes, setNotes] =
        useState<Note[]>(() => getNotesForUser(userId));

    const [selectedNoteId, setSelectedNoteId] =
        useState<string>(() => {
            return notes[0]?.id ?? "";
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
        saveNotes(notes, userId);
    }, [notes, userId]);

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
