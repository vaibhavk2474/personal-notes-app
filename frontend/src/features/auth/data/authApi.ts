import type { AuthUser, SignInInput, SignUpInput } from "../types/auth";

class ApiError extends Error {
	readonly status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = "ApiError";
		this.status = status;
	}
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === "object" && value !== null && !Array.isArray(value);

const readUser = (payload: unknown): AuthUser => {
	if (!isRecord(payload) || !isRecord(payload.user)) {
		throw new Error("The server returned an invalid account response.");
	}

	const user = payload.user;
	if (typeof user.id !== "string" || typeof user.name !== "string" || typeof user.email !== "string") {
		throw new Error("The server returned an invalid account response.");
	}

	return { id: user.id, name: user.name, email: user.email };
};

const request = async (path: string, options: RequestInit = {}): Promise<Response> =>
	fetch(path, {
		...options,
		credentials: "include",
		headers: {
			...(options.body ? { "Content-Type": "application/json" } : {}),
			...options.headers,
		},
	});

const readErrorMessage = async (response: Response): Promise<string> => {
	const payload: unknown = await response.json().catch(() => null);
	return isRecord(payload) && typeof payload.message === "string"
		? payload.message
		: "Something went wrong. Please try again.";
};

export const authApi = {
	async getSession(): Promise<AuthUser | null> {
		const response = await request("/api/auth/me");
		if (response.status === 401) {
			return null;
		}
		if (!response.ok) {
			throw new ApiError(await readErrorMessage(response), response.status);
		}
		return readUser(await response.json());
	},

	async signUp(input: SignUpInput): Promise<AuthUser> {
		const response = await request("/api/auth/register", {
			method: "POST",
			body: JSON.stringify(input),
		});
		if (!response.ok) {
			throw new ApiError(await readErrorMessage(response), response.status);
		}
		return readUser(await response.json());
	},

	async signIn(input: SignInInput): Promise<AuthUser> {
		const response = await request("/api/auth/login", {
			method: "POST",
			body: JSON.stringify(input),
		});
		if (!response.ok) {
			throw new ApiError(await readErrorMessage(response), response.status);
		}
		return readUser(await response.json());
	},

	async signOut(): Promise<void> {
		const response = await request("/api/auth/logout", { method: "POST" });
		if (!response.ok) {
			throw new ApiError(await readErrorMessage(response), response.status);
		}
	},
};
