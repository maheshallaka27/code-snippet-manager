import { Folder, Pencil, Trash2 } from "lucide-react";

import { useNavigate } from "react-router-dom";

const CollectionCard = ({ collection, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/collections/${collection._id}`)}
      className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex justify-between">
        <div>
          <Folder size={42} className="text-blue-600" />

          <h2 className="mt-3 text-2xl font-bold">{collection.name}</h2>

          <p className="mt-2 text-slate-500">{collection.description}</p>

          <p className="mt-4 text-sm text-slate-400">
            {collection.snippets?.length || 0} snippets
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(collection);
            }}
            className="rounded-lg border border-amber-200 bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(collection);
            }}
            className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
