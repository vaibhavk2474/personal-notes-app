import { NotificationProvider } from "../../context/notifications/NotificationProvider";
import { ThemeContextProvider } from "../../context/theme/ThemeContextProvider";
import { AuthProvider } from "../../features/auth/context/AuthProvider";
import ThemeContextWrapper from "./ThemeContextWrapper";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<AuthProvider>
			<ThemeContextProvider>
				<NotificationProvider>
					<ThemeContextWrapper>{children}</ThemeContextWrapper>
				</NotificationProvider>
			</ThemeContextProvider>
		</AuthProvider>
	);
};

export default AppProviders;
