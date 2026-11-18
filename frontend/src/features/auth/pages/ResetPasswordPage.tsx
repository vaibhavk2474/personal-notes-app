import { useState, type FormEvent } from "react";
import { Alert, Button, Stack, TextField } from "@mui/material";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/useAuth";
import { authApi } from "../data/authApi";

const ResetPasswordPage = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { refreshSession } = useAuth();
	const token = searchParams.get("token")?.trim() ?? "";
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isComplete, setIsComplete] = useState(false);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");

		if (password.length < 8 || password.length > 128) {
			setError("Use a password between 8 and 128 characters.");
			return;
		}

		if (password !== confirmPassword) {
			setError("The passwords do not match.");
			return;
		}

		if (!token) {
			setError("This reset link is missing its token. Request a new reset link.");
			return;
		}

		setIsSubmitting(true);
		try {
			await authApi.resetPassword({ token, password });
			setIsComplete(true);
			setPassword("");
			setConfirmPassword("");
			await refreshSession().catch(() => undefined);
			navigate("/reset-password", { replace: true });
		} catch (submissionError) {
			setError(submissionError instanceof Error ? submissionError.message : "Unable to reset your password.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const hasToken = Boolean(token);

	return (
		<AuthLayout
			title={isComplete ? "Password updated" : hasToken ? "Choose a new password" : "Reset link required"}
			description={
				isComplete
					? "Your password has been changed. Sign in with your new password."
					: hasToken
						? "Enter a new password for your PersonalNotes account."
						: "Open the password reset link from your email, or request a new one."
			}
			footerText="Remember your password?"
			footerLinkText="Sign in"
			footerLinkTo="/sign-in"
		>
			{isComplete ? (
				<Button component={RouterLink} to="/sign-in" variant="contained" size="large">
					Go to sign in
				</Button>
			) : hasToken ? (
				<Stack component="form" spacing={2} onSubmit={handleSubmit}>
					{error && <Alert severity="error">{error}</Alert>}
					<TextField
						label="New password"
						type="password"
						autoComplete="new-password"
						required
						fullWidth
						slotProps={{ htmlInput: { minLength: 8, maxLength: 128 } }}
						value={password}
						onChange={(event) => {
							setPassword(event.target.value);
							setError("");
						}}
						helperText="At least 8 characters"
					/>
					<TextField
						label="Confirm new password"
						type="password"
						autoComplete="new-password"
						required
						fullWidth
						slotProps={{ htmlInput: { minLength: 8, maxLength: 128 } }}
						value={confirmPassword}
						onChange={(event) => {
							setConfirmPassword(event.target.value);
							setError("");
						}}
					/>
					<Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
						{isSubmitting ? "Resetting…" : "Reset password"}
					</Button>
					<Button component={RouterLink} to="/forgot-password" variant="text">
						Request a new reset link
					</Button>
				</Stack>
			) : (
				<Stack spacing={2}>
					<Alert severity="warning" role="status">
						This link does not include a reset token.
					</Alert>
					<Button component={RouterLink} to="/forgot-password" variant="contained" size="large">
						Request a new reset link
					</Button>
				</Stack>
			)}
		</AuthLayout>
	);
};

export default ResetPasswordPage;
