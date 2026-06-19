import { createContext } from "react";

export type ThemeMode = "light" | "dark";

interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
}


export const themeContext = createContext<ThemeContextType | null>(null);
