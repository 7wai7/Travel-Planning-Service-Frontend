import { useState } from "react";
import AuthForm from "../components/AuthForm";
import css from "../styles/AuthPage.module.css";

export default function AuthPage() {
  const [isSignup, setSignup] = useState(false);

  return (
    <div className={css.auth_card}>
      <div className={css.left}>
        <h1>Travel planning service</h1>
        <p>
          Create trips, organize places, and collaborate with others in one
          convenient workspace. Plan journeys together, manage details, and keep
          everything structured from start to finish.
        </p>
      </div>
      <div className={css.right}>
        <h3>{isSignup ? "Signup" : "Login"}</h3>
        <AuthForm isSignup={isSignup} />
        {!isSignup && (
          <p className={css.bottom}>
            Don't have an account?
            <button
              className={css.login_btn}
              type="button"
              onClick={() => setSignup(true)}
            >
              Signup.
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
