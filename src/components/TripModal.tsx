import Modal from "./ui/Modal";
import TripForm from "./TripForm";
import { useTripModal } from "../hooks/useTripModal";

export default function TripModal() {
  const {
    isOpen,
    isEditing,
    ui,
    setUi,
    submit,
    close,
    isSubmitting,
    error,
  } = useTripModal();

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      title={isEditing ? "Edit trip" : "Create trip"}
    >
      <TripForm
        ui={ui}
        onChange={setUi}
        onSubmit={submit}
        onCancel={close}
        isSubmitting={isSubmitting}
        isEditing={isEditing}
        error={error}
      />
    </Modal>
  );
}
