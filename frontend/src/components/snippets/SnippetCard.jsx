import { Heart, Eye, Copy, Pencil, Trash2, Globe, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
const SnippetCard = ({
  snippet,
  onEdit,
  onDelete,
  onFavorite,
  onPublic,
  showEdit = true,
  showDelete = true,
  showFavorite = true,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/snippets/${snippet._id}`)}
      className=" cursor-pointer rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {snippet.title}
          </h2>

          <span className="mt-2 inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            {snippet.language}
          </span>
        </div>

        {showFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite?.(snippet._id);
            }}
          >
            <Heart
              size={22}
              className={
                snippet.favorite
                  ? "fill-red-500 text-red-500"
                  : "text-slate-400"
              }
            />
          </button>
        )}
      </div>

      <p className="mt-4 line-clamp-2 text-slate-600">{snippet.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {snippet.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-5 text-slate-500">
          <div className="flex items-center gap-1">
            <Eye size={18} />
            {snippet.viewCount}
          </div>

          <div className="flex items-center gap-1">
            <Copy size={18} />
            {snippet.copyCount}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPublic(snippet._id);
            }}
            className={`rounded-lg p-2 text-white ${
              snippet.isPublic
                ? "bg-green-500 hover:bg-green-600"
                : "bg-slate-500 hover:bg-slate-600"
            }`}
          >
            {snippet.isPublic ? <Globe size={18} /> : <Lock size={18} />}
          </button>
          {showEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(snippet);
              }}
              className="rounded-lg border border-amber-200 bg-amber-50 p-2 text-amber-600 hover:bg-amber-100"
            >
              <Pencil size={18} />
            </button>
          )}
          {showDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(snippet);
              }}
              className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 hover:bg-red-100"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
