import { createContext } from "react";

import type { AuthUser, SignInInput, SignUpInput } from "../types/auth";

export interface AuthContextValue {
	user: AuthUser | null;
	isLoading: boolean;
	signUp: (input: SignUpInput) => Promise<void>;
	signIn: (input: SignInInput) => Promise<void>;
	signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
