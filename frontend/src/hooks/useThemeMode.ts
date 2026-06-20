import useThemeContext from "../context/theme/useThemeContext";

export const useThemeMode = () => {
    const { mode, toggleTheme } = useThemeContext();

    return { mode, toggleTheme };
};