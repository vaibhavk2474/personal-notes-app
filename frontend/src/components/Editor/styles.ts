import type { SxProps, Theme } from "@mui/material";

export const editorStyles: Record<string, SxProps<Theme>> = {
    container: {
        maxWidth: 900,
        mx: "auto",
        py: 4,
    },

    title: {
        width: "100%",
        fontSize: "2.5rem",
        fontWeight: 700,
        lineHeight: 1.2,
        mb: 3,
    },

    content: {
        width: "100%",
        fontSize: "1rem",
        lineHeight: 1.8,
    },
};