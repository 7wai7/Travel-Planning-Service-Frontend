import { useState, type FormEvent } from "react";
import css from "../styles/TripAccessPage.module.css";
import { useInviteTrip } from "../hooks/trips.hooks";
import { useTrip } from "../hooks/useTrip.hook";

type AccessValues = {
  email: string;
};

export default function AccessForm() {
  const [values, setValues] = useState<Partial<AccessValues>>({});
  const { data, mutate, error, reset, isPending } = useInviteTrip();
  const { trip } = useTrip();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    reset();
    if (!values.email) return;

    mutate({ email: values.email, tripId: trip.id });
  };

  return (
    <form className={css.access_form} onSubmit={onSubmit}>
      <label className={css.form_label}>Invite Collaborator</label>
      <div className={css.form_bottom}>
        <input
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
          className={css.send_invite_btn}
          disabled={isPending}
        >
          Send invite
        </button>
      </div>
      {data && (
        <div className={css.invite_data}>
          <label className={css.form_label}>Invite link:</label>
          <a href={data.inviteLink} target="_blank" rel="noopener noreferrer">
            {data.inviteLink}
          </a>
        </div>
      )}
      {error && (
        <p className={`error_message ${css.error_message}`}>{error.message}</p>
      )}
    </form>
  );
}
