import { useState } from "react";
import toast from "react-hot-toast";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";

import CollectionToolbar from "../../components/collections/CollectionToolbar";
import CollectionCard from "../../components/collections/CollectionCard";

import CreateCollectionModal from "../../components/collections/CreateCollectionModal";
import EditCollectionModal from "../../components/collections/EditCollectionModal";

import ConfirmDialog from "../../components/ui/ConfirmDialog";

import useCollections from "../../hooks/useCollections";

const Collections = () => {
  const {
    collections,
    loading,
    error,

    search,
    setSearch,

    addCollection,
    editCollection,
    removeCollection,
  } = useCollections();

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [selectedCollection, setSelectedCollection] = useState(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleEdit = (collection) => {
    setSelectedCollection(collection);

    setOpenEditModal(true);
  };

  const handleDeleteClick = (collection) => {
    setSelectedCollection(collection);

    setOpenDeleteDialog(true);
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      await removeCollection(selectedCollection._id);

      toast.success("Collection deleted");

      setOpenDeleteDialog(false);

      setSelectedCollection(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete collection");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Collections</h1>

        <p className="mt-2 text-slate-500">
          Organize your snippets into collections.
        </p>
      </div>

      <CollectionToolbar
        search={search}
        setSearch={setSearch}
        onCreate={() => setOpenCreateModal(true)}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {collections.length > 0 ? (
          collections.map((collection) => (
            <CollectionCard
              key={collection._id}
              collection={collection}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          ))
        ) : (
          <EmptyState
            title="No Collections"
            description="Create your first collection."
            buttonText="Create Collection"
            onClick={() => setOpenCreateModal(true)}
          />
        )}
      </div>

      <CreateCollectionModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        addCollection={addCollection}
      />

      <EditCollectionModal
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          setSelectedCollection(null);
        }}
        collection={selectedCollection}
        editCollection={editCollection}
      />

      <ConfirmDialog
        open={openDeleteDialog}
        title="Delete Collection"
        message="This collection will be permanently deleted."
        confirmText="Delete"
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => {
          setOpenDeleteDialog(false);
          setSelectedCollection(null);
        }}
      />
    </div>
  );
};

export default Collections;
