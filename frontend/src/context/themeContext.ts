import { createContext } from "react";

export type ThemeMode = "light" | "dark";

interface ThemeContextType {
    mode: ThemeMode;

    toggleTheme: () => void;

    sidebarOpen: boolean;

    setSidebarOpen: React.Dispatch<
        React.SetStateAction<boolean>
    >;
}

export const themeContext =
    createContext<ThemeContextType | null>(
        null,
    );