import { useState, type FormEvent } from "react";
import { Alert, Button, Stack, TextField } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import { authApi } from "../data/authApi";

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setMessage("");
		setError("");
		setIsSubmitting(true);

		try {
			await authApi.requestPasswordReset(email);
			setMessage("If an account with that email exists, password reset instructions will be sent.");
		} catch (submissionError) {
			setError(submissionError instanceof Error ? submissionError.message : "Unable to request a password reset.");
		} finally {
			setIsSubmitting(false);
			setEmail("");
		}
	};

	return (
		<AuthLayout
			title="Forgot your password?"
			description="Enter your account email address to get instructions for resetting your password."
			footerText="Remember your password?"
			footerLinkText="Sign in"
			footerLinkTo="/sign-in"
		>
			<Stack component="form" spacing={2} onSubmit={handleSubmit}>
				{message && (
					<Alert severity="success" role="status">
						{message}
					</Alert>
				)}
				{error && <Alert severity="error">{error}</Alert>}
				<TextField
					label="Email address"
					type="email"
					autoComplete="email"
					required
					fullWidth
					value={email}
					onChange={(event) => {
						setEmail(event.target.value);
						setMessage("");
						setError("");
					}}
				/>
				<Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
					{isSubmitting ? "Sending…" : "Send reset link"}
				</Button>
				<Button component={RouterLink} to="/sign-in" variant="text">
					Back to sign in
				</Button>
			</Stack>
		</AuthLayout>
	);
};

export default ForgotPasswordPage;
