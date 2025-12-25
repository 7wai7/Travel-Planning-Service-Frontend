import useConfirmDialogStore from "../stores/ConfirmDialogStore";
import css from "../styles/TripPage.module.css";

export default function ConfirmDialog() {
  const { isOpen, title, description, onCancel, onConfirm, reset } =
    useConfirmDialogStore();

  if (!isOpen) return null;

  return (
    <div className={css.modal_overlay}>
      <div className={css.confirm_modal}>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className={css.confirm_actions}>
          <button
            className={css.secondary_btn}
            onClick={() => {
              onCancel?.();
              reset();
            }}
          >
            Cancel
          </button>
          <button
            className={css.delete_trip_btn}
            onClick={() => {
              onConfirm?.();
              reset();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
