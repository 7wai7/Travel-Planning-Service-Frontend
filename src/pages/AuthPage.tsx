import { useState, type FormEvent } from "react";
import css from "../styles/AuthPage.module.css";
import type { AuthData } from "../types/AuthData";
import { login, register } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import useFieldErrors from "../hooks/useFieldErrors";
import { FieldError } from "../utils/FieldError";

export default function AuthPage() {
  const [isSignup, setSignup] = useState(true);
  const [authData, setAuthData] = useState<Partial<AuthData>>({});
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { errors: authErrors, showErrors } = useFieldErrors();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    (isSignup ? register : login)(authData as AuthData)
      .then((user) => {
        setUser(user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.fields)
        if (err instanceof FieldError) {
          showErrors(err.fields);
        }
      });
  };

  return (
    <div className={css.auth_card}>
      <div className={css.left}>
        <h1>Meeting Room Booking App</h1>
        <p>Registration and booking management.</p>
      </div>
      <div className={css.right}>
        <h3>{isSignup ? "Signup" : "Login"}</h3>
        <form onSubmit={onSubmit}>
          {isSignup && (
            <>
              <input
                type="text"
                id="regName"
                required
                placeholder="Name"
                value={authData?.name || ""}
                onChange={(e) =>
                  setAuthData({ ...authData, name: e.target.value })
                }
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
            onChange={(e) =>
              setAuthData({ ...authData, email: e.target.value })
            }
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
            onChange={(e) =>
              setAuthData({ ...authData, password: e.target.value })
            }
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
        {isSignup && (
          <p className={css.bottom}>
            Already have an account?
            <button
              className={css.login_btn}
              type="button"
              onClick={() => setSignup(false)}
            >
              Login.
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
