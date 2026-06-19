import type { ReactNode } from "react";
import { useThemeMode } from "../../hooks/useThemeMode";
import { getTheme } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

interface Props {
	children: ReactNode;
}
function ThemeContextWrapper({ children }: Props) {
	const { mode } = useThemeMode();

	return (
		<ThemeProvider theme={getTheme(mode)}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}

export default ThemeContextWrapper;
