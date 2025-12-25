import useConfirmDialogStore from "../stores/ConfirmDialogStore";
import css from "../styles/TripPage.module.css";

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDialog({ onCancel, onConfirm }: Props) {
  const { isOpen, title, description } = useConfirmDialogStore();

  if (!isOpen) return null;
  return (
    <div className={css.modal_overlay}>
      <div className={css.confirm_modal}>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className={css.confirm_actions}>
          <button className={css.secondary_btn} onClick={onCancel}>
            Cancel
          </button>
          <button className={css.delete_trip_btn} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
