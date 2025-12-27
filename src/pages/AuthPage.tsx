import { useState } from "react";
import AuthForm from "../components/AuthForm";

export default function AuthPage() {
  const [isSignup, setSignup] = useState(false);

  return (
    <div className="mx-auto my-auto w-[60%] max-w-225 p-8 flex flex-row gap-8 bg-white rounded-2xl shadow-(--shadow)">
      <div className="flex-1 py-8 px-2 rounded-2xl bg-[linear-gradient(180deg,#eef2ff,#f8fafc)]">
        <h1 className="text-black text-2xl mb-5">Travel planning service</h1>
        <p className="mt-0.5 text-(--muted) text-sm">
          Create trips, organize places, and collaborate with others in one
          convenient workspace. Plan journeys together, manage details, and keep
          everything structured from start to finish.
        </p>
      </div>
      <div className="w-[40%] flex flex-col justify-between">
        <h3 className="text-black mb-5 text-xl">{isSignup ? "Signup" : "Login"}</h3>
        <AuthForm isSignup={isSignup} />
        {!isSignup && (
          <p className="mt-5 text-(--muted) text-sm self-end">
            Don't have an account?{" "}
            <button
              className="text-(--blue) text-5sm"
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
