import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { RequireAuth, RequireGuest } from "./features/auth/routing/AuthRouteGuards";
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
				</Route>
				<Route element={<RequireAuth />}>
					<Route path="/" element={<Dashboard />} />
				</Route>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
