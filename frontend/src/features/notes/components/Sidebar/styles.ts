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
        borderRadius: 2,

        "&.Mui-selected": {
            backgroundColor:
                "action.selected",
        },

        "&.Mui-selected:hover": {
            backgroundColor:
                "action.selected",
        },
    },

    deleteButton: {
        opacity: 0,

        ".MuiListItemButton-root:hover &": {
            opacity: 1,
        },
    },

    noNotes: {
        fontStyle: 'italic',
        fontSize: '14px',
        opacity: 0.6,
        textAlign: 'center',
    }
};