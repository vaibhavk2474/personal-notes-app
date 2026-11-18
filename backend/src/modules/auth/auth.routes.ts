import { Router } from "express";
import rateLimit from "express-rate-limit";

import { forgotPassword, login, logout, me, register, resetPassword } from "./auth.controller.js";
import { requireAuth, requireSameOrigin } from "./auth.middleware.js";

const router = Router();

const authRateLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false });
const passwordResetRateLimit = rateLimit({
	windowMs: 60 * 60 * 1000,
	limit: 5,
	standardHeaders: true,
	legacyHeaders: false,
	message: { message: "Too many password reset requests. Please try again later." },
});
const completePasswordResetRateLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });

router.use((_request, response, next) => {
	response.setHeader("Cache-Control", "no-store");
	next();
});

router.post("/register", requireSameOrigin, authRateLimit, register);
router.post("/login", requireSameOrigin, authRateLimit, login);
router.post("/forgot-password", requireSameOrigin, passwordResetRateLimit, forgotPassword);
router.post("/reset-password", requireSameOrigin, completePasswordResetRateLimit, resetPassword);
router.get("/me", requireAuth, me);
router.post("/logout", requireSameOrigin, logout);

export default router;
