import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { RequireAuth, RequireGuest } from "./features/auth/routing/AuthRouteGuards";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";
import SignInPage from "./features/auth/pages/SignInPage";
import SignUpPage from "./features/auth/pages/SignUpPage";
import Dashboard from "./features/notes/pages/Dashboard";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<RequireGuest />}>
					<Route path="/sign-in" element={<SignInPage />} />
					<Route path="/sign-up" element={<SignUpPage />} />
					<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				</Route>
				<Route path="/reset-password" element={<ResetPasswordPage />} />
				<Route element={<RequireAuth />}>
					<Route path="/" element={<Dashboard />} />
				</Route>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
