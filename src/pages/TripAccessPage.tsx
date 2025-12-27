import AccessForm from "../components/AccessForm";
import { useTrip } from "../hooks/useTrip.hook";
import { useTripPermissions } from "../hooks/useTripPermissions.hook";

export default function TripAccessPage() {
  const { trip } = useTrip();
  const { isOwner } = useTripPermissions(trip);

  if (!isOwner)
    return <p className="text-red-500 text-sm">You are not the owner of this trip</p>;

  return (
    <>
      <h2 className="text-2xl text-black mb-8">Access to travel</h2>
      <AccessForm />
    </>
  );
}
