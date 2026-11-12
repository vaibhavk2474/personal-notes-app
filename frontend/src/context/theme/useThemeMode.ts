import useThemeContext from "./useThemeContext";

export const useThemeMode = () => {
    const { mode, toggleTheme } = useThemeContext();

    return { mode, toggleTheme };
};
