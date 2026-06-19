import type { Note } from "../../types/notes";

export interface SidebarProps {
    notes: Note[];

    selectedNoteId: string;

    search: string;

    onSearchChange: (
        value: string,
    ) => void;

    onSelectNote: (
        id: string,
    ) => void;

    onCreateNote: () => void;
    onDeleteNote: (
        id: string,
    ) => void;
}