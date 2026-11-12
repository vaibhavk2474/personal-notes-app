import { Box, Breadcrumbs, Button, IconButton, Typography } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import DarkModeIcon from "@mui/icons-material/DarkMode";

import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";

import { useThemeMode } from "../../../../context/theme/useThemeMode";

import { useResponsive } from "../../../../shared/hooks/useResponsive";

import { headerStyles } from "./styles";
import useThemeContext from "../../../../context/theme/useThemeContext";
import { useAuth } from "../../../auth/context/useAuth";

const Header = () => {
	const { mode, toggleTheme } = useThemeMode();

	const { setSidebarOpen } = useThemeContext();
	const { user, signOut } = useAuth();

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
				<Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: { xs: 100, sm: 180 } }}>
					{user?.email}
				</Typography>
				<Button color="inherit" size="small" startIcon={<LogoutIcon />} onClick={signOut}>
					Sign out
				</Button>
				<IconButton onClick={toggleTheme}>{mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}</IconButton>
			</Box>
		</Box>
	);
};
export default Header;
