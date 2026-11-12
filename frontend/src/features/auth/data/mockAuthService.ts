import type { AuthUser, SignUpInput } from "../types/auth";

const ACCOUNTS_KEY = "personal-notes-demo-accounts";
const SESSION_KEY = "personal-notes-demo-session";

const isAuthUser = (value: unknown): value is AuthUser => {
	if (!value || typeof value !== "object") {
		return false;
	}

	const user = value as Record<string, unknown>;
	return typeof user.id === "string" && typeof user.name === "string" && typeof user.email === "string";
};

const readAccounts = (): AuthUser[] => {
	try {
		const storedAccounts = localStorage.getItem(ACCOUNTS_KEY);
		const parsed: unknown = storedAccounts ? JSON.parse(storedAccounts) : [];
		return Array.isArray(parsed) ? parsed.filter(isAuthUser) : [];
	} catch {
		return [];
	}
};

const readSession = (): AuthUser | null => {
	try {
		const storedSession = localStorage.getItem(SESSION_KEY);
		if (!storedSession) {
			return null;
		}

		const parsed: unknown = JSON.parse(storedSession);
		return isAuthUser(parsed) ? parsed : null;
	} catch {
		return null;
	}
};

export const mockAuthService = {
	getSession: readSession,

	signUp({ name, email }: SignUpInput): AuthUser {
		const normalizedEmail = email.trim().toLowerCase();
		const accounts = readAccounts();

		if (accounts.some((account) => account.email === normalizedEmail)) {
			throw new Error("An account with this email already exists in this browser.");
		}

		const user: AuthUser = {
			id: crypto.randomUUID(),
			name: name.trim(),
			email: normalizedEmail,
		};

		localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, user]));
		localStorage.setItem(SESSION_KEY, JSON.stringify(user));
		return user;
	},

	signIn(email: string): AuthUser {
		const normalizedEmail = email.trim().toLowerCase();
		const user = readAccounts().find((account) => account.email === normalizedEmail);

		if (!user) {
			throw new Error("No demo account was found. Create an account first.");
		}

		localStorage.setItem(SESSION_KEY, JSON.stringify(user));
		return user;
	},

	signOut(): void {
		localStorage.removeItem(SESSION_KEY);
	},
};
