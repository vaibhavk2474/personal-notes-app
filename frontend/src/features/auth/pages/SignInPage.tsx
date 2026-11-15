import { useState, type FormEvent } from "react";
import { Alert, Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/useAuth";

const SignInPage = () => {
	const { signIn } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");
		setIsSubmitting(true);

		try {
			await signIn({ email, password });
			navigate("/", { replace: true });
		} catch (submissionError) {
			setError(submissionError instanceof Error ? submissionError.message : "Unable to sign in.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<AuthLayout
			title="Welcome back"
			description="Sign in to continue to your notes."
			footerText="New to PersonalNotes?"
			footerLinkText="Create an account"
			footerLinkTo="/sign-up"
		>
			<Stack component="form" spacing={2} onSubmit={handleSubmit}>
				{error && <Alert severity="error">{error}</Alert>}
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
					autoComplete="current-password"
					required
					fullWidth
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
					{isSubmitting ? "Signing in…" : "Sign in"}
				</Button>
			</Stack>
		</AuthLayout>
	);
};

export default SignInPage;
