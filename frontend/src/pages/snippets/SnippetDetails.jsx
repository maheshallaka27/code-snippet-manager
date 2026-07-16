import { useState } from "react";
import Editor from "@monaco-editor/react";
import toast from "react-hot-toast";
import {
  Copy,
  Download,
  Eye,
  Globe,
  Lock,
  Heart,
  Calendar,
  Tag,
} from "lucide-react";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import Button from "../../components/ui/Button";

import useSnippet from "../../hooks/useSnippet.js";
import {
  toggleFavourite,
  togglePublic,
} from "../../services/snippet.service.js";

const SnippetDetails = () => {
  const { snippet, loading, error, copyCode, refreshSnippet } = useSnippet();

  const [actionLoading, setActionLoading] = useState(false);

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;

  const handleCopy = async () => {
    try {
      await copyCode();
      toast.success("Code copied");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([snippet.code], {
      type: "text/plain",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    const extensions = {
      java: "java",
      javascript: "js",
      python: "py",
      cpp: "cpp",
      c: "c",
    };

    link.download = `${snippet.title}.${extensions[snippet.language] || "txt"}`;

    link.click();

    window.URL.revokeObjectURL(url);
  };

  const handleFavorite = async () => {
    try {
      setActionLoading(true);

      await toggleFavourite(snippet._id);

      await refreshSnippet();

      toast.success("Favorite updated");
    } catch {
      toast.error("Failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handlePublic = async () => {
    try {
      setActionLoading(true);

      await togglePublic(snippet._id);

      await refreshSnippet();

      toast.success("Visibility updated");
    } catch {
      toast.error("Failed");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="rounded-2xl bg-white p-8 shadow">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">{snippet.title}</h1>

            <p className="mt-2 text-slate-500">{snippet.description}</p>
          </div>

          <span className="rounded-lg bg-blue-100 px-4 py-2 font-semibold text-blue-700">
            {snippet.language}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {snippet.tags?.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-sm"
            >
              <Tag size={14} />
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-8 text-slate-500">
          <div className="flex items-center gap-2">
            <Eye size={18} />
            {snippet.viewCount}
          </div>

          <div className="flex items-center gap-2">
            <Copy size={18} />
            {snippet.copyCount}
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={18} />
            {new Date(snippet.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Editor */}

      <div className="overflow-hidden rounded-2xl border border-slate-300">
        <Editor
          height="600px"
          language={snippet.language}
          value={snippet.code}
          theme="vs-dark"
          options={{
            readOnly: true,
            minimap: {
              enabled: false,
            },
            fontSize: 15,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

      {/* Actions */}

      <div className="flex flex-wrap gap-4">
        <Button className="w-auto" onClick={handleCopy}>
          <Copy size={18} />
          <span className="ml-2">Copy</span>
        </Button>

        <Button className="w-auto" onClick={handleDownload}>
          <Download size={18} />
          <span className="ml-2">Download</span>
        </Button>

        <Button
          className="w-auto"
          onClick={handleFavorite}
          disabled={actionLoading}
        >
          <Heart
            size={18}
            className={snippet.favorite ? "fill-red-500 text-red-500" : ""}
          />

          <span className="ml-2">Favorite</span>
        </Button>

        <Button
          className="w-auto"
          onClick={handlePublic}
          disabled={actionLoading}
        >
          {snippet.isPublic ? <Globe size={18} /> : <Lock size={18} />}

          <span className="ml-2">
            {snippet.isPublic ? "Public" : "Private"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default SnippetDetails;
