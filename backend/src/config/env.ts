import "dotenv/config";

const port = Number(process.env.PORT ?? 3000);
const mongoUri = process.env.MONGODB_URI;
const sessionSecret = process.env.SESSION_SECRET;
const appOrigin = process.env.APP_ORIGIN ?? "http://localhost:5173";
const nodeEnv = process.env.NODE_ENV ?? "development";

if (!Number.isInteger(port) || port < 1 || port > 65535) {
	throw new Error("PORT must be a valid TCP port number.");
}

if (!mongoUri) {
	throw new Error("MONGODB_URI is required. Copy .env.example to .env and configure it.");
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
};
