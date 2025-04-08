export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignupFormValues {
  email: string;
  name: string;
  password: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}
