import { NotificationProvider } from "../../context/Notification/NotificationProvider";
import { ThemeContextProvider } from "../../context/theme/ThemeContextProvider";
import ThemeContextWrapper from "./ThemeContextWrapper";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeContextProvider>
			<NotificationProvider>
				<ThemeContextWrapper>{children}</ThemeContextWrapper>
			</NotificationProvider>
		</ThemeContextProvider>
	);
};

export default AppProviders;
