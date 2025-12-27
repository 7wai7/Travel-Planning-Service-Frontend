import useConfirmDialogStore from "../../stores/ConfirmDialogStore";

export default function ConfirmDialog() {
  const { isOpen, title, description, onCancel, onConfirm, reset } =
    useConfirmDialogStore();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="w-130 bg-white p-4 rounded-2xl">
        <h3 className="text-black text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-10">{description}</p>
        <div className="flex justify-end gap-4">
          <button
            className="interact border border-gray-300 hover:border-gray-700 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2"
            onClick={() => {
              onCancel?.();
              reset();
            }}
          >
            Cancel
          </button>
          <button
            className="interact border border-red-200 hover:border-red-500 bg-red-100 hover:bg-red-200 text-red-600 py-1 px-2"
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
