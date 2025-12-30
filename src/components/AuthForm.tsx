import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const {
    mutate: auth,
    error,
    reset,
  } = useMutation({
    mutationFn: isSignup ? register : login,
    onSuccess: () => navigate("/"),
  });

  useEffect(reset, [isSignup, reset]);

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
        className="form-element text-black w-full px-1 py-1 my-2"
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
            className="form-element text-black w-full px-1 py-1 my-2"
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
        className="form-element text-black w-full px-1 py-1 my-2"
        type="password"
        id="regPassword"
        required
        placeholder="Password"
        value={authValues?.password || ""}
        onChange={(e) =>
          setAuthValues({ ...authValues, password: e.target.value })
        }
      />
      <button
        type="submit"
        className="form-element cursor-pointer text-white bg-(--blue) rounded-xl w-full py-2 mt-4"
        disabled={canSubmit}
      >
        {isSignup ? "Signup" : "Login"}
      </button>
      {error && (
        <p className="text-red-500 text-center mt-3">
          {Array.isArray(error.message) ? error.message[0] : error.message}
        </p>
      )}
    </form>
  );
}
