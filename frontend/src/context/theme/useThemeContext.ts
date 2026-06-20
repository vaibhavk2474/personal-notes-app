import { useContext } from "react";
import { themeContext } from "./themeContext";

const useThemeContext = () => {
    const context = useContext(themeContext);

    if (!context) {
        throw new Error("useThemeContext must be used inside ThemeContextProvider");
    }

    return context;
};

export default useThemeContext;