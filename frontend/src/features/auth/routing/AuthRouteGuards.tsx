import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../context/useAuth";

export const RequireAuth = () => {
	const { user } = useAuth();
	const location = useLocation();

	return user ? <Outlet /> : <Navigate to="/sign-in" replace state={{ from: location }} />;
};

export const RequireGuest = () => {
	const { user } = useAuth();
	return user ? <Navigate to="/" replace /> : <Outlet />;
};
