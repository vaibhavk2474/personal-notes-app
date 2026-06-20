import { useState, type ReactNode } from "react";

import { Alert, Snackbar } from "@mui/material";
import type { NotificationType } from "./notificationContext";
import { notificationContext } from "./notificationContext";

interface Props {
	children: ReactNode;
}
const AUTO_HIDE_DURATION = 3000;
export const NotificationProvider = ({ children }: Props) => {
	const [open, setOpen] = useState(false);

	const [message, setMessage] = useState("");

	const [severity, setSeverity] = useState<NotificationType>("success");

	const showNotification = (message: string, type: NotificationType = "success") => {
		setMessage(message);
		setSeverity(type);
		setOpen(true);
	};

	return (
		<notificationContext.Provider
			value={{
				showNotification,
				success: (message) => showNotification(message, "success"),
				error: (message) => showNotification(message, "error"),
				info: (message) => showNotification(message, "info"),
				warning: (message) => showNotification(message, "warning"),
			}}
		>
			{children}

			<Snackbar
				open={open}
				autoHideDuration={AUTO_HIDE_DURATION}
				onClose={(_, reason) => {
					if (reason === "clickaway") {
						return;
					}

					setOpen(false);
				}}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
			>
				<Alert severity={severity} variant="filled">
					{message}
				</Alert>
			</Snackbar>
		</notificationContext.Provider>
	);
};
