import { useTripPlaces } from "../hooks/useTripPlaces.hook";
import type { Place } from "../services/api/places/places.types";
import type { Trip } from "../services/api/trips/trips.types";
import useConfirmDialogStore from "../stores/ConfirmDialogStore";
import css from "../styles/TripPage.module.css";

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
    <div className={css.place_item}>
      <div className={css.place_left}>
        <div className={css.place_day}>Day {place.dayNumber}</div>
        <hr className={`vertical-hr ${css.vertical_hr}`} />
        <div>
          <div className={css.place_name}>{place.locationName}</div>
          {place.notes && <div className={css.place_notes}>{place.notes}</div>}
        </div>
      </div>

      <div className={css.place_right}>
        {canEdit && (
          <>
            <button
              className={css.icon_btn}
              aria-label="Edit place"
              onClick={onEdit}
              title="Edit"
            >
              Edit
            </button>
            <button
              className={css.icon_btn}
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
