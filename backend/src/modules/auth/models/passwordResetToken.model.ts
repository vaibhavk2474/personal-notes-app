import { model, Schema, Types } from "mongoose";

export interface PasswordResetTokenRecord {
	userId: Types.ObjectId;
	tokenHash: string;
	expiresAt: Date;
}

const passwordResetTokenSchema = new Schema<PasswordResetTokenRecord>(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
		tokenHash: { type: String, required: true, unique: true },
		expiresAt: { type: Date, required: true, expires: 0 },
	},
	{ timestamps: true },
);

export const PasswordResetToken = model<PasswordResetTokenRecord>("PasswordResetToken", passwordResetTokenSchema);
