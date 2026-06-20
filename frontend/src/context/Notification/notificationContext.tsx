import { createContext } from "react";

export type NotificationType = "success" | "error" | "info" | "warning";

export interface NotificationContextType {
	showNotification: (message: string, type?: NotificationType) => void;
	success: (message: string) => void;
	error: (message: string) => void;
	info: (message: string) => void;
	warning: (message: string) => void;
}

export const notificationContext = createContext<NotificationContextType | null>(null);
