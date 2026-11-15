import type { ReactNode } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Link as RouterLink } from "react-router-dom";

interface AuthLayoutProps {
	title: string;
	description: string;
	footerText: string;
	footerLinkText: string;
	footerLinkTo: string;
	children: ReactNode;
}

const AuthLayout = ({ title, description, footerText, footerLinkText, footerLinkTo, children }: AuthLayoutProps) => (
	<Box
		sx={{
			minHeight: "100vh",
			display: "grid",
			placeItems: "center",
			px: 2,
			py: 5,
			bgcolor: "background.default",
		}}
	>
		<Stack spacing={3} sx={{ width: "100%", maxWidth: 440 }}>
			<Stack direction="row" spacing={1.5} sx={{ alignItems: "center", justifyContent: "center" }}>
				<Box sx={{ display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: 2, bgcolor: "primary.main", color: "primary.contrastText" }}>
					<MenuBookIcon />
				</Box>
				<Typography variant="h5" sx={{ fontWeight: 700 }}>
					PersonalNotes
				</Typography>
			</Stack>

			<Paper variant="outlined" sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3 }}>
				<Stack spacing={2.5}>
					<Box>
						<Typography variant="h4" component="h1" gutterBottom>
							{title}
						</Typography>
						<Typography color="text.secondary">{description}</Typography>
					</Box>

					{children}

					<Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
						{footerText}{" "}
						<Box
							component={RouterLink}
							to={footerLinkTo}
							sx={{ color: "primary.main", fontWeight: 600, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
						>
							{footerLinkText}
						</Box>
					</Typography>
				</Stack>
			</Paper>
		</Stack>
	</Box>
);

export default AuthLayout;
