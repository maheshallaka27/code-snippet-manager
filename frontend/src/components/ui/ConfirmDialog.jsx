import Modal from "./Modal";
import Button from "./Button";

const ConfirmDialog = ({
  open,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  return (
    <Modal open={open} title={title} onClose={onCancel} size="sm">
      <div className="space-y-6">
        <p className="text-slate-600">{message}</p>

        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            className="w-auto"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <Button
            variant="danger"
            className="w-auto"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Please wait..." : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
