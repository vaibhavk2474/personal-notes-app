import { useState, type FormEvent } from "react";
import { Alert, Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/useAuth";

const SignUpPage = () => {
	const { signUp } = useAuth();
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");

		if (password.length < 8) {
			setError("Use at least 8 characters for your password.");
			return;
		}

		if (!name.trim()) {
			setError("Enter your name.");
			return;
		}

		if (password !== confirmPassword) {
			setError("The passwords do not match.");
			return;
		}

		setIsSubmitting(true);
		try {
			signUp({ name, email });
			navigate("/", { replace: true });
		} catch (submissionError) {
			setError(submissionError instanceof Error ? submissionError.message : "Unable to create an account.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<AuthLayout
			title="Create your account"
			description="A quiet place to keep your thoughts organized."
			footerText="Already have a demo account?"
			footerLinkText="Sign in"
			footerLinkTo="/sign-in"
		>
			<Alert severity="info" variant="outlined">
				Demo flow only: your password is used for form validation, then discarded. No real account is created.
			</Alert>

			<Stack component="form" spacing={2} onSubmit={handleSubmit}>
				{error && <Alert severity="error">{error}</Alert>}
				<TextField
					label="Your name"
					autoComplete="name"
					required
					fullWidth
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
				<TextField
					label="Email address"
					type="email"
					autoComplete="email"
					required
					fullWidth
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<TextField
					label="Password"
					type="password"
					autoComplete="new-password"
					required
					fullWidth
					slotProps={{ htmlInput: { minLength: 8 } }}
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					helperText="At least 8 characters"
				/>
				<TextField
					label="Confirm password"
					type="password"
					autoComplete="new-password"
					required
					fullWidth
					value={confirmPassword}
					onChange={(event) => setConfirmPassword(event.target.value)}
				/>
				<Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
					{isSubmitting ? "Creating account…" : "Create account"}
				</Button>
			</Stack>
		</AuthLayout>
	);
};

export default SignUpPage;
