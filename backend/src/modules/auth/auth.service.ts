import argon2 from "argon2";
import { createHash, randomBytes } from "node:crypto";

import { env } from "../../config/env.js";
import { sendPasswordResetEmail } from "./email/passwordResetEmail.js";
import { authRepository } from "./auth.repository.js";

export class AuthServiceError extends Error {
	constructor(
		message: string,
		readonly status: number,
	) {
		super(message);
		this.name = "AuthServiceError";
	}
}

const isDuplicateKeyError = (error: unknown): boolean =>
	typeof error === "object" && error !== null && "code" in error && error.code === 11000;

export const authService = {
	async registerAccount(input: { name: string; email: string; password: string }) {
		const passwordHash = await argon2.hash(input.password, { type: argon2.argon2id });
		try {
			return await authRepository.createUser({
				name: input.name,
				email: input.email,
				passwordHash,
				sessionVersion: 0,
			});
		} catch (error) {
			if (isDuplicateKeyError(error)) {
				throw new AuthServiceError("An account with this email already exists.", 409);
			}
			throw error;
		}
	},

	async authenticate(email: string, password: string) {
		const user = await authRepository.findUserByEmailWithPassword(email);
		const passwordMatches = user ? await argon2.verify(user.passwordHash, password).catch(() => false) : false;
		if (!user || !passwordMatches) {
			throw new AuthServiceError("Email or password is incorrect.", 401);
		}
		return user;
	},

	findUserById(userId: string) {
		return authRepository.findUserById(userId);
	},

	async requestPasswordReset(email: string): Promise<void> {
		const user = await authRepository.findUserByEmail(email);
		if (!user) {
			return;
		}

		const rawToken = randomBytes(32).toString("hex");
		const tokenHash = createHash("sha256").update(rawToken).digest("hex");
		const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
		const resetToken = await authRepository.createPasswordResetToken({ userId: user._id, tokenHash, expiresAt });
		const resetUrl = new URL("/reset-password", env.appOrigin);
		resetUrl.searchParams.set("token", rawToken);

		try {
			await sendPasswordResetEmail(user.email, resetUrl.toString());
		} catch {
			await authRepository.deletePasswordResetTokenById(resetToken._id);
			console.error("Password reset email delivery failed.");
		}
	},

	async resetPassword(token: string, password: string): Promise<void> {
		const tokenHash = createHash("sha256").update(token).digest("hex");
		const resetToken = await authRepository.findValidPasswordResetToken(tokenHash, new Date());
		if (!resetToken) {
			throw new AuthServiceError("This reset link is invalid or has expired. Request a new reset link.", 400);
		}

		const passwordHash = await argon2.hash(password, { type: argon2.argon2id });
		const consumedToken = await authRepository.consumePasswordResetToken({
			id: resetToken._id,
			tokenHash,
			now: new Date(),
		});
		if (!consumedToken) {
			throw new AuthServiceError("This reset link is invalid or has expired. Request a new reset link.", 400);
		}

		const updatedUser = await authRepository.updatePasswordAndIncrementSessionVersion(consumedToken.userId, passwordHash);
		if (!updatedUser) {
			throw new AuthServiceError("This reset link is invalid or has expired. Request a new reset link.", 400);
		}

		await authRepository.deletePasswordResetTokensForUser(consumedToken.userId);
	},
};
