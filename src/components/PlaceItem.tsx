import { useTripPlaces } from "../hooks/useTripPlaces.hook";
import type { Place } from "../services/api/places/places.types";
import type { Trip } from "../services/api/trips/trips.types";
import useConfirmDialogStore from "../stores/ConfirmDialogStore";

type Props = {
  trip: Trip;
  place: Place;
  canEdit?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function PlaceItem({
  trip,
  place,
  canEdit,
  onEdit,
  onDelete,
}: Props) {
  const setConfirm = useConfirmDialogStore((s) => s.setConfirm);
  const { remove } = useTripPlaces(trip);

  const handleDeletePlaceConfirm = () => {
    setConfirm({
      isOpen: true,
      title: "Delete place",
      description:
        "Are you sure you want to delete this place? This action cannot be undone.",
      subject: "place",
      payload: place.id,
      onConfirm: async () => await remove(place.id),
    });
  };

  return (
    <div className="flex justify-between items-center bg-blue-50 rounded-2xl p-3">
      <div className="flex flex-row">
        <div className="font-bold text-black mb-1.5 text-nowrap">Day {place.dayNumber}</div>
        <hr className={`h-7 border-r border-r-gray-400 mx-4`} />
        <div>
          <div className="text-black">{place.locationName}</div>
          {place.notes && <div className="mt-1.5 text-sm text-gray-500">{place.notes}</div>}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        {canEdit && (
          <>
            <button
              className="interact border-blue-200 hover:border-blue-500 bg-blue-100 hover:bg-blue-200 text-blue-600 py-1 px-2"
              aria-label="Edit place"
              onClick={onEdit}
              title="Edit"
            >
              Edit
            </button>
            <button
              className="interact border-red-200 hover:border-red-500 bg-red-100 hover:bg-red-200 text-red-600 py-1 px-2"
              aria-label="Delete place"
              onClick={() => {
                handleDeletePlaceConfirm();
                onDelete?.();
              }}
              title="Delete"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
