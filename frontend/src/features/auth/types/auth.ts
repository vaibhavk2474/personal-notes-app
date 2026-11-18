export interface AuthUser {
	id: string;
	name: string;
	email: string;
}

export interface SignUpInput {
	name: string;
	email: string;
	password: string;
}

export interface SignInInput {
	email: string;
	password: string;
}

export interface ResetPasswordInput {
	token: string;
	password: string;
}
