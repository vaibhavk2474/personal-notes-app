import type { SxProps, Theme } from "@mui/material";

export const sidebarStyles: Record<string, SxProps<Theme>> = {
    container: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },

    header: {
        p: 2,
    },

    title: {
        fontWeight: 700,
    },

    content: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
        px: 2,
    },

    notesSection: {
        mt: 2,
    },

    noteItem: {
        cursor: "pointer",
        borderRadius: 2,
        px: 1.5,
        py: 1,

        "&:hover": {
            bgcolor: "action.hover",
        },
    },
};