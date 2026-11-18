import "dotenv/config";

const port = Number(process.env.PORT ?? 3000);
const mongoUri = process.env.MONGODB_URI;
const sessionSecret = process.env.SESSION_SECRET;
const appOrigin = process.env.APP_ORIGIN ?? "http://localhost:5173";
const nodeEnv = process.env.NODE_ENV ?? "development";
const mailHost = process.env.MAIL_HOST ?? (nodeEnv === "development" ? "localhost" : undefined);
const mailPort = Number(process.env.MAIL_PORT ?? 1025);
const mailSecureValue = process.env.MAIL_SECURE ?? "false";
const mailFrom = process.env.MAIL_FROM ?? (nodeEnv === "development" ? "PersonalNotes <no-reply@personalnotes.local>" : undefined);
const mailUser = process.env.MAIL_USER?.trim() || undefined;
const mailPassword = process.env.MAIL_PASSWORD || undefined;

if (!Number.isInteger(port) || port < 1 || port > 65535) {
	throw new Error("PORT must be a valid TCP port number.");
}

if (!mongoUri) {
	throw new Error("MONGODB_URI is required. Copy .env.example to .env and configure it.");
}

if (!mailHost || !mailFrom) {
	throw new Error("MAIL_HOST and MAIL_FROM are required outside development.");
}

if (!Number.isInteger(mailPort) || mailPort < 1 || mailPort > 65535) {
	throw new Error("MAIL_PORT must be a valid TCP port number.");
}

if (mailSecureValue !== "true" && mailSecureValue !== "false") {
	throw new Error("MAIL_SECURE must be either true or false.");
}

if (Boolean(mailUser) !== Boolean(mailPassword)) {
	throw new Error("MAIL_USER and MAIL_PASSWORD must either both be set or both be empty.");
}

if (!sessionSecret || sessionSecret.length < 32 || sessionSecret.startsWith("replace-")) {
	throw new Error("SESSION_SECRET must be a random secret with at least 32 characters. See the setup guide.");
}

let parsedAppOrigin: URL;
try {
	parsedAppOrigin = new URL(appOrigin);
} catch {
	throw new Error("APP_ORIGIN must be a valid absolute URL.");
}

export const env = {
	port,
	mongoUri,
	sessionSecret,
	appOrigin: parsedAppOrigin.origin,
	isProduction: nodeEnv === "production",
	mailHost,
	mailPort,
	mailSecure: mailSecureValue === "true",
	mailRequireTls: nodeEnv === "production" && mailSecureValue !== "true",
	mailFrom,
	mailUser,
	mailPassword,
};
