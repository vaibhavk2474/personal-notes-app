import { Box, Breadcrumbs, IconButton, Typography } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import DarkModeIcon from "@mui/icons-material/DarkMode";

import LightModeIcon from "@mui/icons-material/LightMode";

import { useThemeMode } from "../../hooks/useThemeMode";

import useThemeContext from "../../context/useThemeContext";

import { useResponsive } from "../../hooks/useResponsive";

import { headerStyles } from "./styles";

const Header = () => {
	const { mode, toggleTheme } = useThemeMode();

	const { setSidebarOpen } = useThemeContext();

	const { isMobile } = useResponsive();

	return (
		<Box sx={headerStyles.container}>
			<Box sx={headerStyles.left}>
				{isMobile && (
					<IconButton onClick={() => setSidebarOpen(true)}>
						<MenuIcon />
					</IconButton>
				)}

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
