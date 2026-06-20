import { useEffect } from "react";

interface UseKeyboardShortcutsProps {
    onCreateNote: () => void;
    onCloseDrawer: () => void;
    isDrawerOpen: boolean;
}

export const useKeyboardShortcuts = ({
    onCreateNote,
    onCloseDrawer,
    isDrawerOpen,
}: UseKeyboardShortcutsProps) => {
    useEffect(() => {
        const handleKeyDown = (
            event: KeyboardEvent,
        ) => {
            const target =
                event.target as HTMLElement;

            const isInput =
                target.tagName ===
                "INPUT" ||
                target.tagName ===
                "TEXTAREA" ||
                target.isContentEditable;

            if (isInput) {
                return;
            }
            // Alt + N to create a new note
            if (
                event.altKey &&
                event.key.toLowerCase() ===
                "n"
            ) {
                event.preventDefault();

                onCreateNote();
            }

            // Escape
            if (
                event.key === "Escape" &&
                isDrawerOpen
            ) {
                onCloseDrawer();
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown,
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown,
            );
        };
    }, [
        onCreateNote,
        onCloseDrawer,
        isDrawerOpen,
    ]);
};