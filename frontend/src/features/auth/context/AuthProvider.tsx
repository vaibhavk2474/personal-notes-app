import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import { authApi } from "../data/authApi";
import { AuthContext } from "./authContext";
import type { AuthUser, SignInInput, SignUpInput } from "../types/auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isCurrent = true;
		authApi.getSession()
			.then((sessionUser) => {
				if (isCurrent) setUser(sessionUser);
			})
			.catch(() => {
				if (isCurrent) setUser(null);
			})
			.finally(() => {
				if (isCurrent) setIsLoading(false);
			});

		return () => {
			isCurrent = false;
		};
	}, []);

	useEffect(() => {
		if (!user) {
			return;
		}

		let lastSessionCheck = Date.now();
		let isCheckingSession = false;
		const checkSessionOnActivity = () => {
			const now = Date.now();
			if (isCheckingSession || now - lastSessionCheck < 5 * 60 * 1000) {
				return;
			}

			lastSessionCheck = now;
			isCheckingSession = true;
			authApi.getSession()
				.then((sessionUser) => {
					if (!sessionUser) setUser(null);
				})
				.catch(() => undefined)
				.finally(() => {
					isCheckingSession = false;
				});
		};

		const activityEvents: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "touchstart", "wheel"];
		activityEvents.forEach((eventName) => window.addEventListener(eventName, checkSessionOnActivity, { passive: true }));
		return () => activityEvents.forEach((eventName) => window.removeEventListener(eventName, checkSessionOnActivity));
	}, [user]);

	const signUp = useCallback(async (input: SignUpInput) => {
		setUser(await authApi.signUp(input));
	}, []);

	const signIn = useCallback(async (input: SignInInput) => {
		setUser(await authApi.signIn(input));
	}, []);

	const signOut = useCallback(async () => {
		await authApi.signOut();
		setUser(null);
	}, []);

	const refreshSession = useCallback(async () => {
		setUser(await authApi.getSession());
	}, []);

	const value = useMemo(
		() => ({ user, isLoading, signUp, signIn, signOut, refreshSession }),
		[user, isLoading, signUp, signIn, signOut, refreshSession],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
