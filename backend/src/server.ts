import app from "./app.js";
import { env } from "./config/env.js";
import { connectToDatabase } from "./db/connect.js";

const start = async () => {
	await connectToDatabase();
	const server = app.listen(env.port, "0.0.0.0", () => {
		console.info(`PersonalNotes API listening on port ${env.port}.`);
	});

	const shutdown = () => {
		server.close(() => process.exit(0));
	};
	process.on("SIGINT", shutdown);
	process.on("SIGTERM", shutdown);
};

start().catch((error: unknown) => {
	console.error("Could not start the API:", error);
	process.exit(1);
});
