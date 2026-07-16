import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState.jsx";
import SnippetToolbar from "../../components/snippets/SnippetToolbar";
import SnippetCard from "../../components/snippets/SnippetCard";
import useSnippets from "../../hooks/useSnippets.js";
import { useState } from "react";

import CreateSnippetModal from "../../components/snippets/CreateSnippetModal";
import EditSnippetModal from "../../components/snippets/EditSnippetModal";

import ConfirmDialog from "../../components/ui/ConfirmDialog";

import toast from "react-hot-toast";
const Snippets = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const {
    snippets,
    loading,
    error,

    search,
    setSearch,

    language,
    setLanguage,

    sort,
    setSort,
    refreshSnippets,
    removeSnippet,
    favoriteSnippet,
    publicSnippet,
  } = useSnippets();

  const handleEdit = (snippet) => {
    setSelectedSnippet(snippet);
    setOpenEditModal(true);
  };
  const handleDeleteClick = (snippet) => {
    console.log("Delete cliecked", snippet);
    setSelectedSnippet(snippet);
    setOpenDeleteDialog(true);
  };
  const handleDelete = async () => {
    console.log("Deleting snippet:", selectedSnippet);
    if (!selectedSnippet) return;

    try {
      setDeleteLoading(true);

      await removeSnippet(selectedSnippet._id);

      toast.success("Snippet deleted successfully");

      setOpenDeleteDialog(false);

      setSelectedSnippet(null);
      console.log("Deleting", selectedSnippet);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete snippet");
    } finally {
      setDeleteLoading(false);
    }
  };
  const handleFavorite = async (id) => {
    try {
      await favoriteSnippet(id);
      toast.success("Favorite updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update favorite");
    }
  };
  const handlePublicToggle = async (id) => {
    try {
      await publicSnippet(id);

      toast.success("Visibility updated");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update visibility",
      );
    }
  };
  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Snippets</h1>

        <p className="mt-2 text-slate-500">Manage all your code snippets.</p>
      </div>
      <SnippetToolbar
        search={search}
        setSearch={setSearch}
        language={language}
        setLanguage={setLanguage}
        sort={sort}
        setSort={setSort}
        onCreate={() => setOpenCreateModal(true)}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {snippets.length > 0 ? (
          snippets.map((snippet) => (
            <SnippetCard
              key={snippet._id}
              snippet={snippet}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              onFavorite={handleFavorite}
              onPublic={handlePublicToggle}
            />
          ))
        ) : (
          <EmptyState
            title="No snippets found"
            description="Create your first snippet."
            buttonText="Create Snippet"
            onClick={() => setOpenCreateModal(true)}
          />
        )}
      </div>
      <CreateSnippetModal
        open={openCreateModal}
        onClose={() => {
          {
            setOpenCreateModal(false);
            setSelectedSnippet(null);
          }
        }}
        refreshSnippets={refreshSnippets}
      />
      <EditSnippetModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        snippet={selectedSnippet}
        refreshSnippets={refreshSnippets}
      />

      <ConfirmDialog
        open={openDeleteDialog}
        title="Delete Snippet"
        message="Are you sure you want to permanently delete this snippet?"
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => {
          setOpenDeleteDialog(false);
          setSelectedSnippet(null);
        }}
      />
    </div>
  );
};

export default Snippets;
