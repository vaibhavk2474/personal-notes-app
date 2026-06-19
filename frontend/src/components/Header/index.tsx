import { Box, Breadcrumbs, IconButton, Typography } from "@mui/material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useThemeMode } from "../../hooks/useThemeMode";

import { headerStyles } from "./styles";

const Header = () => {
	const { mode, toggleTheme } = useThemeMode();

	return (
		<Box sx={headerStyles.container}>
			<Box sx={headerStyles.left}>
				<Breadcrumbs>
					<Typography color="text.secondary">Workspace</Typography>

					<Typography>Notes</Typography>
				</Breadcrumbs>
			</Box>

			<Box sx={headerStyles.right}>
				<IconButton onClick={toggleTheme}>{mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}</IconButton>
			</Box>
		</Box>
	);
};

export default Header;
