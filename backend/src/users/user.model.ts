import { model, Schema } from "mongoose";

export interface UserRecord {
	name: string;
	email: string;
	passwordHash: string;
	sessionVersion: number;
}

const userSchema = new Schema<UserRecord>(
	{
		name: { type: String, required: true, trim: true, maxlength: 100 },
		email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 254 },
		passwordHash: { type: String, required: true, select: false },
		sessionVersion: { type: Number, required: true, default: 0 },
	},
	{ timestamps: true },
);

export const User = model<UserRecord>("User", userSchema);
