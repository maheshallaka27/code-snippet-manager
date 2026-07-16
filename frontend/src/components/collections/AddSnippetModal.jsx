import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Loader from "../common/Loader";

import { getSnippets } from "../../services/snippet.service";

const AddSnippetModal = ({ open, onClose, addSnippet }) => {
  const [snippets, setSnippets] = useState([]);

  const [loading, setLoading] = useState(false);

  const [addingId, setAddingId] = useState(null);

  const loadSnippets = async () => {
    try {
      setLoading(true);

      const data = await getSnippets({
        page: 1,
        limit: 100,
        sort: "latest",
      });

      setSnippets(data.snippets);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load snippets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadSnippets();
    }
  }, [open]);

  const handleAdd = async (id) => {
    try {
      setAddingId(id);

      await addSnippet(id);

      toast.success("Snippet added");

      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add snippet");
    } finally {
      setAddingId(null);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Snippet" size="lg">
      {loading ? (
        <Loader />
      ) : (
        <div className="max-h-[500px] space-y-4 overflow-y-auto">
          {snippets.length === 0 ? (
            <p className="text-center text-slate-500">No snippets found.</p>
          ) : (
            snippets.map((snippet) => (
              <div
                key={snippet._id}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
              >
                <div>
                  <h3 className="font-semibold">{snippet.title}</h3>

                  <p className="text-sm text-slate-500">{snippet.language}</p>
                </div>

                <Button
                  className="w-auto"
                  disabled={addingId === snippet._id}
                  onClick={() => handleAdd(snippet._id)}
                >
                  {addingId === snippet._id ? "Adding..." : "Add"}
                </Button>
              </div>
            ))
          )}
        </div>
      )}
    </Modal>
  );
};

export default AddSnippetModal;
