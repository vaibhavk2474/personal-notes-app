import express, { type ErrorRequestHandler } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import helmet from "helmet";

import { env } from "./config/env.js";
import { IDLE_SESSION_MS } from "./modules/auth/auth.middleware.js";
import authRouter from "./modules/auth/auth.routes.js";

const app = express();

if (env.isProduction) {
	app.set("trust proxy", 1);
}

app.use(helmet({ strictTransportSecurity: env.isProduction ? undefined : false }));
app.use(express.json({ limit: "16kb" }));
app.use(
	session({
		name: "personalnotes.sid",
		secret: env.sessionSecret,
		store: MongoStore.create({
			mongoUrl: env.mongoUri,
			collectionName: "sessions",
			ttl: IDLE_SESSION_MS / 1000,
		}),
		resave: false,
		saveUninitialized: false,
		rolling: true,
		cookie: {
			httpOnly: true,
			secure: env.isProduction,
			sameSite: "lax",
			path: "/",
			maxAge: IDLE_SESSION_MS,
		},
	}),
);

app.get("/api/health", (_request, response) => {
	response.json({ status: "ok" });
});

app.use("/api/auth", authRouter);

app.use((_request, response) => {
	response.status(404).json({ message: "Route not found." });
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
	console.error("Unhandled API error:", error);
	response.status(500).json({ message: "Something went wrong. Please try again." });
};

app.use(errorHandler);

export default app;
