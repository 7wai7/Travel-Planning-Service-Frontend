import css from "../styles/TripPage.module.css";

type Props = {
  open: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDialog({ open, title, description, onCancel, onConfirm }: Props) {
  if (!open) return null;
  return (
    <div className={css.modal_overlay}>
      <div className={css.confirm_modal}>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className={css.confirm_actions}>
          <button className={css.secondary_btn} onClick={onCancel}>Cancel</button>
          <button className={css.delete_trip_btn} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
