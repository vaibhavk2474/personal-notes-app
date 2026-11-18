import type { Request, RequestHandler } from "express";

import { authService, AuthServiceError } from "./auth.service.js";
import { clearSessionCookie } from "./auth.middleware.js";

interface PublicUser {
	id: string;
	name: string;
	email: string;
}

const toPublicUser = (user: { _id: unknown; name: string; email: string }): PublicUser => ({
	id: String(user._id),
	name: user.name,
	email: user.email,
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === "object" && value !== null && !Array.isArray(value);

const readString = (record: Record<string, unknown>, key: string): string | null =>
	typeof record[key] === "string" ? record[key] : null;

const startUserSession = async (request: Request, userId: string, sessionVersion: number) => {
	await new Promise<void>((resolve, reject) => {
		request.session.regenerate((error) => (error ? reject(error) : resolve()));
	});
	request.session.userId = userId;
	request.session.authenticatedAt = Date.now();
	request.session.sessionVersion = sessionVersion;
	await new Promise<void>((resolve, reject) => {
		request.session.save((error) => (error ? reject(error) : resolve()));
	});
};

const handleServiceError = (error: unknown, response: Parameters<RequestHandler>[1]): boolean => {
	if (!(error instanceof AuthServiceError)) return false;
	response.status(error.status).json({ message: error.message });
	return true;
};

export const register: RequestHandler = async (request, response) => {
	const body: unknown = request.body;
	if (!isRecord(body)) {
		response.status(400).json({ message: "Enter your name, email, and password." });
		return;
	}
	const name = readString(body, "name")?.trim();
	const email = readString(body, "email")?.trim().toLowerCase();
	const password = readString(body, "password");
	const validEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	if (!name || name.length > 100 || !validEmail || email.length > 254 || !password || password.length < 8 || password.length > 128) {
		response.status(400).json({ message: "Enter a name, a valid email, and a password between 8 and 128 characters." });
		return;
	}
	try {
		const user = await authService.registerAccount({ name, email, password });
		await startUserSession(request, String(user._id), user.sessionVersion);
		response.status(201).json({ user: toPublicUser(user) });
	} catch (error) {
		if (!handleServiceError(error, response)) throw error;
	}
};

export const login: RequestHandler = async (request, response) => {
	const body: unknown = request.body;
	const email = isRecord(body) ? readString(body, "email")?.trim().toLowerCase() : null;
	const password = isRecord(body) ? readString(body, "password") : null;
	if (!email || !password) {
		response.status(400).json({ message: "Enter your email and password." });
		return;
	}
	try {
		const user = await authService.authenticate(email, password);
		await startUserSession(request, String(user._id), user.sessionVersion ?? 0);
		response.json({ user: toPublicUser(user) });
	} catch (error) {
		if (!handleServiceError(error, response)) throw error;
	}
};

export const forgotPassword: RequestHandler = async (request, response) => {
	const email = isRecord(request.body) ? readString(request.body, "email")?.trim().toLowerCase() : null;
	if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		response.status(400).json({ message: "Enter a valid email address." });
		return;
	}
	await authService.requestPasswordReset(email);
	response.status(202).json({ message: "If an account with that email exists, password reset instructions will be sent." });
};

export const resetPassword: RequestHandler = async (request, response) => {
	const body: unknown = request.body;
	const token = isRecord(body) ? readString(body, "token") : null;
	const password = isRecord(body) ? readString(body, "password") : null;
	if (!token || !/^[a-f0-9]{64}$/.test(token) || !password || password.length < 8 || password.length > 128) {
		response.status(400).json({ message: "The reset link is invalid or expired, or the password does not meet the requirements." });
		return;
	}
	try {
		await authService.resetPassword(token, password);
		response.json({ message: "Your password has been reset. Sign in with your new password." });
	} catch (error) {
		if (!handleServiceError(error, response)) throw error;
	}
};

export const me: RequestHandler = async (request, response) => {
	const user = await authService.findUserById(request.session.userId!);
	if (!user) {
		await new Promise<void>((resolve) => request.session.destroy(() => resolve()));
		clearSessionCookie(response);
		response.status(401).json({ message: "This account is no longer available. Sign in again." });
		return;
	}
	response.json({ user: toPublicUser(user) });
};

export const logout: RequestHandler = async (request, response) => {
	if (request.session.userId) {
		await new Promise<void>((resolve, reject) => request.session.destroy((error) => (error ? reject(error) : resolve())));
	}
	clearSessionCookie(response);
	response.status(204).end();
};
