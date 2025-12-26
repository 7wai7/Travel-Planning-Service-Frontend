import { useTrip } from "../hooks/useTrip.hook";
import { useTripPermissions } from "../hooks/useTripPermissions.hook";
import css from "../styles/TripAccessPage.module.css";

export default function TripAccessPage() {
  const { trip } = useTrip();
  const { isOwner } = useTripPermissions(trip);

  if (!isOwner)
    return <p className="error_message">You are not the owner of this trip</p>;

  return <h2 className={css.header}>Access to travel</h2>;
}
