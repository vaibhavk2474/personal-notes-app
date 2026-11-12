import { Box, Drawer } from "@mui/material";

import useThemeContext from "../../../context/theme/useThemeContext";

import { useResponsive } from "../../hooks/useResponsive";
import { designTokens } from "../../../theme";

interface Props {
	sidebar: React.ReactNode;
	header: React.ReactNode;
	children: React.ReactNode;
}

const MainLayout = ({ sidebar, header, children }: Props) => {
	const { sidebarOpen, setSidebarOpen } = useThemeContext();

	const { isMobile } = useResponsive();

	return (
		<Box
			sx={{
				display: "flex",
				height: "100vh",
				bgcolor: "background.default",
			}}
		>
			{!isMobile && (
				<Box
					sx={{
						width: "100%",
						maxWidth: designTokens.layout.sidebarWidth,
						borderRight: 1,
						borderColor: "divider",
						bgcolor: "background.paper",
					}}
				>
					{sidebar}
				</Box>
			)}

			{isMobile && (
				<Drawer
					open={sidebarOpen}
					onClose={() => setSidebarOpen(false)}
					sx={{
						"& .MuiDrawer-paper": {
							borderRadius: 0,
						},
					}}
				>
					<Box
						sx={{
						width: designTokens.layout.mobileSidebarWidth,
							height: "100%",
						}}
					>
						{sidebar}
					</Box>
				</Drawer>
			)}

			<Box
				sx={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Box
					sx={{
						height: designTokens.layout.headerHeight,
						borderBottom: 1,
						borderColor: "divider",
						bgcolor: "background.paper",
					}}
				>
					{header}
				</Box>

				<Box
					sx={{
						flex: 1,
						p: {
							xs: 2,
							md: 4,
						},
						overflow: "auto",
					}}
				>
					{children}
				</Box>
			</Box>
		</Box>
	);
};

export default MainLayout;
