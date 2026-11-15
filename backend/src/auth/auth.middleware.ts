import type { RequestHandler, Response } from "express";

import { env } from "../config/env.js";

export const IDLE_SESSION_MS = 7 * 24 * 60 * 60 * 1000;
export const ABSOLUTE_SESSION_MS = 30 * 24 * 60 * 60 * 1000;

export const clearSessionCookie = (response: Response) => {
	response.clearCookie("personalnotes.sid", {
		httpOnly: true,
		secure: env.isProduction,
		sameSite: "lax",
		path: "/",
	});
};

export const requireAuth: RequestHandler = async (request, response, next) => {
	const { userId, authenticatedAt } = request.session;
	if (!userId || !authenticatedAt) {
		response.status(401).json({ message: "Sign in is required." });
		return;
	}

	if (Date.now() - authenticatedAt >= ABSOLUTE_SESSION_MS) {
		await new Promise<void>((resolve) => request.session.destroy(() => resolve()));
		clearSessionCookie(response);
		response.status(401).json({ message: "Your session expired. Sign in again." });
		return;
	}

	next();
};

export const requireSameOrigin: RequestHandler = (request, response, next) => {
	if (request.get("origin") !== env.appOrigin) {
		response.status(403).json({ message: "Request origin is not allowed." });
		return;
	}

	next();
};
