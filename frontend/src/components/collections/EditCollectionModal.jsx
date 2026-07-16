import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Modal from "../ui/Modal";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";

const EditCollectionModal = ({ open, onClose, collection, editCollection }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (collection) {
      reset({
        name: collection.name,
        description: collection.description,
      });
    }
  }, [collection, reset]);

  const onSubmit = async (data) => {
    try {
      await editCollection(collection._id, data);

      toast.success("Collection updated");

      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update collection");
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Collection" size="md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Collection Name"
          error={errors.name?.message}
          {...register("name", {
            required: "Collection name is required",
          })}
        />

        <TextArea label="Description" rows={4} {...register("description")} />

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
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCollectionModal;
