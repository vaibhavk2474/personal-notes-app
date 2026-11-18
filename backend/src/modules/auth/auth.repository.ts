import { Types } from "mongoose";

import { PasswordResetToken } from "./models/passwordResetToken.model.js";
import { User } from "./models/user.model.js";

export const authRepository = {
	createUser(input: { name: string; email: string; passwordHash: string; sessionVersion: number }) {
		return User.create(input);
	},

	findUserByEmail(email: string) {
		return User.findOne({ email });
	},

	findUserByEmailWithPassword(email: string) {
		return User.findOne({ email }).select("+passwordHash");
	},

	findUserById(userId: string) {
		return User.findById(userId);
	},

	findSessionVersion(userId: string) {
		return User.findById(userId).select("sessionVersion");
	},

	createPasswordResetToken(input: { userId: Types.ObjectId; tokenHash: string; expiresAt: Date }) {
		return PasswordResetToken.create(input);
	},

	findValidPasswordResetToken(tokenHash: string, now: Date) {
		return PasswordResetToken.findOne({ tokenHash, expiresAt: { $gt: now } });
	},

	consumePasswordResetToken(input: { id: Types.ObjectId; tokenHash: string; now: Date }) {
		return PasswordResetToken.findOneAndDelete({
			_id: input.id,
			tokenHash: input.tokenHash,
			expiresAt: { $gt: input.now },
		});
	},

	updatePasswordAndIncrementSessionVersion(userId: Types.ObjectId, passwordHash: string) {
		return User.findByIdAndUpdate(
			userId,
			{ $set: { passwordHash }, $inc: { sessionVersion: 1 } },
			{ new: true },
		);
	},

	deletePasswordResetTokensForUser(userId: Types.ObjectId) {
		return PasswordResetToken.deleteMany({ userId });
	},

	deletePasswordResetTokenById(id: Types.ObjectId) {
		return PasswordResetToken.deleteOne({ _id: id });
	},
};
