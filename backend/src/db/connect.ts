import mongoose from "mongoose";

import { env } from "../config/env.js";

export const connectToDatabase = async () => {
	await mongoose.connect(env.mongoUri);
	console.info("Connected to MongoDB.");
};
