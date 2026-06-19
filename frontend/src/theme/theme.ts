import { createTheme } from "@mui/material/styles";

import { lightColors, darkColors } from "./colors";
import { typography } from "./typography";

export const getTheme = (mode: "light" | "dark") => {
    const colors = mode === "light" ? lightColors : darkColors;

    return createTheme({
        palette: {
            mode,

            primary: {
                main: colors.primary,
            },

            background: {
                default: colors.background,
                paper: colors.surface,
            },

            text: {
                primary: colors.textPrimary,
                secondary: colors.textSecondary,
            },

            divider: colors.border,
        },

        typography,

        shape: {
            borderRadius: 10,
        },

        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        scrollbarWidth: "thin",
                    },
                },
            },

            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                    },
                },
            },

            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                    },
                },
            },

            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                    },
                },
            },
        },
    });
};