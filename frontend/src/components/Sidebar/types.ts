import type { Note } from "../../types/notes";

export interface SidebarProps {
    notes: Note[];
    selectedNoteId: string;

    onSelectNote: (id: string) => void;
}