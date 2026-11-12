import { createContext } from "react";

import type { AuthUser, SignUpInput } from "../types/auth";

export interface AuthContextValue {
	user: AuthUser | null;
	signUp: (input: SignUpInput) => void;
	signIn: (email: string) => void;
	signOut: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
