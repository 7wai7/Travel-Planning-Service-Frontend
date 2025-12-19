import { useState } from "react";
import type { AuthData } from "../types/AuthData";
import type { Errors } from "../hooks/useFieldErrors";
import css from "../styles/AuthPage.module.css";

interface Props {
  isSignup: boolean;
  authErrors: Errors
  onSubmit: (authData: AuthData) => void;
}

export default function AuthForm({ isSignup, authErrors, onSubmit }: Props) {
  const [authData, setAuthData] = useState<Partial<AuthData>>({});
  
  return (
    <form onSubmit={(e) => {
        e.preventDefault()
        onSubmit(authData as AuthData)
    }}>
      {isSignup && (
        <>
          <input
            type="text"
            id="regName"
            required
            placeholder="Name"
            value={authData?.name || ""}
            onChange={(e) => setAuthData({ ...authData, name: e.target.value })}
          />
          {authErrors.name && (
            <p className={css.error_message}>{authErrors.name.message}</p>
          )}
        </>
      )}
      <input
        type="email"
        id="regEmail"
        required
        placeholder="Email"
        value={authData?.email || ""}
        onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
      />
      {authErrors.email && (
        <p className={css.error_message}>{authErrors.email.message}</p>
      )}
      <input
        type="password"
        id="regPassword"
        required
        placeholder="Password"
        value={authData?.password || ""}
        onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
      />
      {authErrors.password && (
        <p className={css.error_message}>{authErrors.password.message}</p>
      )}
      <button
        type="submit"
        className={css.submit_btn}
        disabled={
          isSignup
            ? !(authData.name && authData.email && authData.password) // signup
            : !(authData.email && authData.password) // login
        }
      >
        {isSignup ? "Signup" : "Login"}
      </button>
    </form>
  );
}
