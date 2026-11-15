import { Box, CircularProgress } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../context/useAuth";

export const RequireAuth = () => {
	const { user, isLoading } = useAuth();
	const location = useLocation();

	if (isLoading) {
		return <AuthLoading />;
	}

	return user ? <Outlet /> : <Navigate to="/sign-in" replace state={{ from: location }} />;
};

export const RequireGuest = () => {
	const { user, isLoading } = useAuth();
	if (isLoading) {
		return <AuthLoading />;
	}
	return user ? <Navigate to="/" replace /> : <Outlet />;
};

const AuthLoading = () => (
	<Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", bgcolor: "background.default" }}>
		<CircularProgress aria-label="Checking sign-in status" />
	</Box>
);
