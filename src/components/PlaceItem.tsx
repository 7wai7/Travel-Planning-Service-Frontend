import type { Place } from "../services/api/places/places.types";
import css from "../styles/TripPage.module.css";

type Props = {
  place: Place;
  canEdit?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function PlaceItem({ place, canEdit, onEdit, onDelete }: Props) {
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
              onClick={onDelete}
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
