import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Modal from "../ui/Modal";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";

const CreateCollectionModal = ({ open, onClose, addCollection }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addCollection(data);

      toast.success("Collection created");

      reset();

      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create collection");
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Create Collection" size="md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Collection Name"
          placeholder="Algorithms"
          error={errors.name?.message}
          {...register("name", {
            required: "Collection name is required",
          })}
        />

        <TextArea
          label="Description"
          placeholder="Collection description..."
          rows={4}
          {...register("description")}
        />

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            className="w-auto"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button type="submit" className="w-auto" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCollectionModal;
