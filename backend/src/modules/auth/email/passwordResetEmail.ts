import nodemailer from "nodemailer";

import { env } from "../../../config/env.js";

const transporter = nodemailer.createTransport({
	host: env.mailHost,
	port: env.mailPort,
	secure: env.mailSecure,
	requireTLS: env.mailRequireTls,
	...(env.mailUser && env.mailPassword ? { auth: { user: env.mailUser, pass: env.mailPassword } } : {}),
});

export const sendPasswordResetEmail = async (to: string, resetUrl: string): Promise<void> => {
	await transporter.sendMail({
		from: env.mailFrom,
		to,
		subject: "Reset your PersonalNotes password",
		text: [
			"We received a request to reset your PersonalNotes password.",
			"",
			`Use this link within 30 minutes to choose a new password: ${resetUrl}`,
			"",
			"If you did not request this, you can ignore this email.",
		].join("\n"),
		html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #242424; max-width: 560px; margin: 0 auto;"><h1 style="font-size: 22px;">Reset your password</h1><p>We received a request to reset your PersonalNotes password.</p><p><a href="${resetUrl}" style="display: inline-block; padding: 12px 18px; border-radius: 6px; background: #285f4e; color: #ffffff; text-decoration: none;">Choose a new password</a></p><p>This link expires in 30 minutes. If you did not request this, you can ignore this email.</p></div>`,
	});
};
