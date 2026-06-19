import { useMemo, useState } from "react";

import type { ReactNode } from "react";

import { themeContext, type ThemeMode } from "./themeContext";

interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
	const [mode, setMode] = useState<ThemeMode>(() => {
		const savedTheme = localStorage.getItem("theme-mode");

		return savedTheme === "dark" ? "dark" : "light";
	});

	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleTheme = () => {
		setMode((prevMode) => {
			const nextMode = prevMode === "light" ? "dark" : "light";

			localStorage.setItem("theme-mode", nextMode);

			return nextMode;
		});
	};

	const value = useMemo(
		() => ({
			mode,

			toggleTheme,

			sidebarOpen,

			setSidebarOpen,
		}),
		[mode, sidebarOpen],
	);

	return <themeContext.Provider value={value}>{children}</themeContext.Provider>;
};
