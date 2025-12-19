import { useCallback, useState } from "react";
import css from "../styles/AuthPage.module.css";
import type { AuthData } from "../types/AuthData";
import { login, register } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import useFieldErrors from "../hooks/useFieldErrors";
import { FieldError } from "../utils/FieldError";
import AuthForm from "../components/AuthForm";

export default function AuthPage() {
  const [isSignup, setSignup] = useState(true);
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { errors: authErrors, showErrors } = useFieldErrors();

  const onSubmit = useCallback(
    (authData: AuthData) => {
      (isSignup ? register : login)(authData)
        .then((user) => {
          setUser(user);
          navigate("/");
        })
        .catch((err) => {
          if (err instanceof FieldError) {
            showErrors(err.fields);
          }
        });
    },
    [isSignup, navigate, setUser, showErrors]
  );

  return (
    <div className={css.auth_card}>
      <div className={css.left}>
        <h1>Meeting Room Booking App</h1>
        <p>Registration and booking management.</p>
      </div>
      <div className={css.right}>
        <h3>{isSignup ? "Signup" : "Login"}</h3>
        <AuthForm
          isSignup={isSignup}
          authErrors={authErrors}
          onSubmit={onSubmit}
        />
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
