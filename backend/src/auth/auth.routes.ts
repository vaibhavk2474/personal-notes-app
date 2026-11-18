import argon2 from "argon2";
import { createHash, randomBytes } from "node:crypto";
import { Router, type Request } from "express";
import rateLimit from "express-rate-limit";

import { env } from "../config/env.js";
import { sendPasswordResetEmail } from "../email/mailer.js";
import { User } from "../users/user.model.js";
import { clearSessionCookie, requireAuth, requireSameOrigin } from "./auth.middleware.js";
import { PasswordResetToken } from "./passwordResetToken.model.js";

const router = Router();

const authRateLimit = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 20,
	standardHeaders: true,
	legacyHeaders: false,
});

const passwordResetRateLimit = rateLimit({
	windowMs: 60 * 60 * 1000,
	limit: 5,
	standardHeaders: true,
	legacyHeaders: false,
	message: { message: "Too many password reset requests. Please try again later." },
});

const completePasswordResetRateLimit = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 10,
	standardHeaders: true,
	legacyHeaders: false,
});

const passwordResetResponse = {
	message: "If an account with that email exists, password reset instructions will be sent.",
};

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

router.use((_request, response, next) => {
	response.setHeader("Cache-Control", "no-store");
	next();
});

router.post("/register", requireSameOrigin, authRateLimit, async (request, response) => {
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
		const passwordHash = await argon2.hash(password, { type: argon2.argon2id });
		const user = await User.create({ name, email, passwordHash, sessionVersion: 0 });
		await startUserSession(request, String(user._id), user.sessionVersion);
		response.status(201).json({ user: toPublicUser(user) });
	} catch (error) {
		if (isRecord(error) && error.code === 11000) {
			response.status(409).json({ message: "An account with this email already exists." });
			return;
		}
		throw error;
	}
});

router.post("/login", requireSameOrigin, authRateLimit, async (request, response) => {
	const body: unknown = request.body;
	const email = isRecord(body) ? readString(body, "email")?.trim().toLowerCase() : null;
	const password = isRecord(body) ? readString(body, "password") : null;
	if (!email || !password) {
		response.status(400).json({ message: "Enter your email and password." });
		return;
	}

	const user = await User.findOne({ email }).select("+passwordHash");
	const passwordMatches = user ? await argon2.verify(user.passwordHash, password).catch(() => false) : false;
	if (!user || !passwordMatches) {
		response.status(401).json({ message: "Email or password is incorrect." });
		return;
	}

	await startUserSession(request, String(user._id), user.sessionVersion ?? 0);
	response.json({ user: toPublicUser(user) });
});

router.post("/forgot-password", requireSameOrigin, passwordResetRateLimit, async (request, response) => {
	const email = isRecord(request.body) ? readString(request.body, "email")?.trim().toLowerCase() : null;
	if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		response.status(400).json({ message: "Enter a valid email address." });
		return;
	}

	const user = await User.findOne({ email });
	if (user) {
		const rawToken = randomBytes(32).toString("hex");
		const tokenHash = createHash("sha256").update(rawToken).digest("hex");
		const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

		const resetToken = await PasswordResetToken.create({ userId: user._id, tokenHash, expiresAt });
		const resetUrl = new URL("/reset-password", env.appOrigin);
		resetUrl.searchParams.set("token", rawToken);

		try {
			await sendPasswordResetEmail(user.email, resetUrl.toString());
		} catch {
			await PasswordResetToken.deleteOne({ _id: resetToken._id });
			console.error("Password reset email delivery failed.");
		}
	}

	response.status(202).json(passwordResetResponse);
});

router.post("/reset-password", requireSameOrigin, completePasswordResetRateLimit, async (request, response) => {
	const body: unknown = request.body;
	const token = isRecord(body) ? readString(body, "token") : null;
	const password = isRecord(body) ? readString(body, "password") : null;
	if (!token || !/^[a-f0-9]{64}$/.test(token) || !password || password.length < 8 || password.length > 128) {
		response.status(400).json({ message: "The reset link is invalid or expired, or the password does not meet the requirements." });
		return;
	}

	const tokenHash = createHash("sha256").update(token).digest("hex");
	const resetToken = await PasswordResetToken.findOne({ tokenHash, expiresAt: { $gt: new Date() } });
	if (!resetToken) {
		response.status(400).json({ message: "This reset link is invalid or has expired. Request a new reset link." });
		return;
	}

	const passwordHash = await argon2.hash(password, { type: argon2.argon2id });
	const consumedToken = await PasswordResetToken.findOneAndDelete({
		_id: resetToken._id,
		tokenHash,
		expiresAt: { $gt: new Date() },
	});
	if (!consumedToken) {
		response.status(400).json({ message: "This reset link is invalid or has expired. Request a new reset link." });
		return;
	}

	const updatedUser = await User.findByIdAndUpdate(
		consumedToken.userId,
		{ $set: { passwordHash }, $inc: { sessionVersion: 1 } },
		{ new: true },
	);
	if (!updatedUser) {
		response.status(400).json({ message: "This reset link is invalid or has expired. Request a new reset link." });
		return;
	}

	await PasswordResetToken.deleteMany({ userId: consumedToken.userId });
	response.json({ message: "Your password has been reset. Sign in with your new password." });
});

router.get("/me", requireAuth, async (request, response) => {
	const user = await User.findById(request.session.userId);
	if (!user) {
		await new Promise<void>((resolve) => request.session.destroy(() => resolve()));
		clearSessionCookie(response);
		response.status(401).json({ message: "This account is no longer available. Sign in again." });
		return;
	}

	response.json({ user: toPublicUser(user) });
});

router.post("/logout", requireSameOrigin, async (request, response) => {
	if (request.session.userId) {
		await new Promise<void>((resolve, reject) => {
			request.session.destroy((error) => (error ? reject(error) : resolve()));
		});
	}
	clearSessionCookie(response);
	response.status(204).end();
});

export default router;
