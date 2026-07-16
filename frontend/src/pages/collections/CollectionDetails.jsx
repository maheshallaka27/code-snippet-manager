import { useState } from "react";
import { Folder, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import Button from "../../components/ui/Button";

import AddSnippetModal from "../../components/collections/AddSnippetModal";

import useCollection from "../../hooks/useCollection";

const CollectionDetails = () => {
  const navigate = useNavigate();

  const { collection, loading, error, addSnippet, removeSnippet } =
    useCollection();

  const [openModal, setOpenModal] = useState(false);

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;

  const handleRemove = async (id) => {
    try {
      await removeSnippet(id);

      toast.success("Snippet removed");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove snippet");
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-white p-8 shadow">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Folder size={40} className="text-blue-600" />

              <h1 className="text-4xl font-bold">{collection.name}</h1>
            </div>

            <p className="mt-3 text-slate-500">{collection.description}</p>
          </div>

          <Button className="w-auto" onClick={() => setOpenModal(true)}>
            + Add Snippet
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {collection.snippets?.length > 0 ? (
          collection.snippets.map((snippet) => (
            <div
              key={snippet._id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/snippets/${snippet._id}`)}
              >
                <h2 className="text-xl font-semibold">{snippet.title}</h2>

                <p className="text-slate-500">{snippet.language}</p>
              </div>

              <button
                onClick={() => handleRemove(snippet._id)}
                className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <h2 className="text-2xl font-semibold">No snippets</h2>

            <p className="mt-2 text-slate-500">
              Add snippets to this collection.
            </p>
          </div>
        )}
      </div>

      <AddSnippetModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        addSnippet={addSnippet}
      />
    </div>
  );
};

export default CollectionDetails;
