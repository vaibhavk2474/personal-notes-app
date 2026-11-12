import { createTheme } from "@mui/material/styles";

import { lightColors, darkColors } from "./colors";
import { typography } from "./typography";
import { designTokens } from "./tokens";

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
            borderRadius: designTokens.radius,
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
                        borderRadius: designTokens.radius,
                    },
                },
            },

            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: designTokens.radius,
                    },
                },
            },

            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: designTokens.radius,
                    },
                },
            },
        },
    });
};
