import { Eye, Copy } from "lucide-react";

const RecentSnippetCard = ({ snippet }) => {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold text-lg">{snippet.title}</h3>

          <p className="text-gray-500">{snippet.language}</p>
        </div>

        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          {snippet.isPublic ? "Public" : "Private"}
        </span>
      </div>

      <p className="mt-3 text-gray-600 line-clamp-2">
        {snippet.description || "No description"}
      </p>

      <div className="mt-4 flex gap-5 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Eye size={16} />
          {snippet.viewCount}
        </div>

        <div className="flex items-center gap-1">
          <Copy size={16} />
          {snippet.copyCount}
        </div>
      </div>
    </div>
  );
};

export default RecentSnippetCard;
