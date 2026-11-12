import { useCallback, useMemo, useState, type ReactNode } from "react";

import { mockAuthService } from "../data/mockAuthService";
import { AuthContext } from "./authContext";
import type { AuthUser, SignUpInput } from "../types/auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<AuthUser | null>(() => mockAuthService.getSession());

	const signUp = useCallback((input: SignUpInput) => {
		setUser(mockAuthService.signUp(input));
	}, []);

	const signIn = useCallback((email: string) => {
		setUser(mockAuthService.signIn(email));
	}, []);

	const signOut = useCallback(() => {
		mockAuthService.signOut();
		setUser(null);
	}, []);

	const value = useMemo(() => ({ user, signUp, signIn, signOut }), [user, signUp, signIn, signOut]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
