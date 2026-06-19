import { ThemeContextProvider } from "../../context/ThemeContextProvider";
import ThemeContextWrapper from "./ThemeContextWrapper";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeContextProvider>
			<ThemeContextWrapper>{children}</ThemeContextWrapper>
		</ThemeContextProvider>
	);
};

export default AppProviders;
