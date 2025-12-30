import { useState, type FormEvent } from "react";
import { useInviteTrip } from "../hooks/trips.hooks";
import { useTrip } from "../hooks/useTrip.hook";

type AccessValues = {
  email: string;
};

export default function AccessForm() {
  const [values, setValues] = useState<Partial<AccessValues>>({});
  const {
    data,
    mutate,
    error: mutateError,
    reset,
    isPending,
  } = useInviteTrip();
  const [error, setError] = useState<Error | null>(null);
  const { trip } = useTrip();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    reset();
    setError(null);

    if (!trip) {
      setError(new Error("Trip not found."));
      return;
    }

    if (!values.email) {
      setError(new Error("Email is request."));
      return;
    }

    mutate({ email: values.email, tripId: trip.id });
  };

  const err = mutateError ?? error;

  return (
    <form className="bg-white rounded-2xl p-4 max-w-[50%]" onSubmit={onSubmit}>
      <h3 className="text-black mb-3">Invite Collaborator</h3>
      <div className="w-full flex flex-row gap-4">
        <input
          className="form-element flex-1 p-1 text-black"
          name="accessEmail"
          required
          type="email"
          value={values.email ?? ""}
          onChange={(e) =>
            setValues({ ...values, email: e.currentTarget.value })
          }
        />

        <button
          type="submit"
          className="interact py-1 px-2 bg-green-50 hover:bg-green-100 text-green-500 border-green-100 hover:border-green-400 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-default"
          disabled={isPending}
        >
          Send invite
        </button>
      </div>
      {data && (
        <div className="mt-4 flex flex-com items-start">
          <label className="text-sm text-gray-500 mb-1 text-nowrap mr-1">
            Invite link:
          </label>
          <a
            href={data.inviteLink}
            className="text-indigo-400 hover:text-indigo-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.inviteLink}
          </a>
        </div>
      )}
      {err && (
        <p className={`text-red-500 text-sm mt-4 text-center`}>
          {err.message}
        </p>
      )}
    </form>
  );
}
