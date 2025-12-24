import { useState } from "react";
import { useNavigate } from "react-router-dom";
import css from "../styles/AuthPage.module.css";
import { useMutation } from "@tanstack/react-query";
import type { RegisterRequest } from "../services/api/auth/auth.types";
import useUserStore from "../stores/UserStore";

interface Props {
  isSignup: boolean;
}

export default function AuthForm({ isSignup }: Props) {
  const { register, login } = useUserStore();
  const [authValues, setAuthValues] = useState<Partial<RegisterRequest>>({});
  const navigate = useNavigate();

  const { mutate: auth, error } = useMutation({
    mutationFn: isSignup ? register : login,
    onSuccess: () => navigate("/"),
  });

  const canSubmit = isSignup
    ? !(authValues.username && authValues.email && authValues.password) // signup
    : !(authValues.username && authValues.password); // login

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        auth(authValues as RegisterRequest);
      }}
    >
      <input
        type="text"
        id="regName"
        required
        placeholder="Name"
        value={authValues?.username || ""}
        onChange={(e) =>
          setAuthValues({ ...authValues, username: e.target.value })
        }
      />
      {isSignup && (
        <>
          <input
            type="email"
            id="regEmail"
            required
            placeholder="Email"
            value={authValues?.email || ""}
            onChange={(e) =>
              setAuthValues({ ...authValues, email: e.target.value })
            }
          />
        </>
      )}
      <input
        type="password"
        id="regPassword"
        required
        placeholder="Password"
        value={authValues?.password || ""}
        onChange={(e) =>
          setAuthValues({ ...authValues, password: e.target.value })
        }
      />
      <button type="submit" className={css.submit_btn} disabled={canSubmit}>
        {isSignup ? "Signup" : "Login"}
      </button>
      {error && <p className={css.error_message}>{error.message}</p>}
    </form>
  );
}
