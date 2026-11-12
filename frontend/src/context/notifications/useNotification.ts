import { useContext } from "react";
import { notificationContext } from "./notificationContext";

const useNotification = () => {
    const context =
        useContext(
            notificationContext,
        );

    if (!context) {
        throw new Error(
            "useNotification must be used inside NotificationProvider",
        );
    }

    return context;
};

export default useNotification;