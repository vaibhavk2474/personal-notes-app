import type { SxProps, Theme } from "@mui/material";

export const headerStyles: Record<string, SxProps<Theme>> = {
    container: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
    },

    left: {
        display: "flex",
        alignItems: "center",
        gap: 1,
    },

    right: {
        display: "flex",
        alignItems: "center",
    },
};