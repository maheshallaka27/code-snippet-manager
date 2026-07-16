import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getSnippet,
  incrementView,
  incrementCopy,
} from "../services/snippet.service";

const useSnippet = () => {
  const { id } = useParams();

  const [snippet, setSnippet] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadSnippet = async () => {
    try {
      setLoading(true);

      setError("");

      const data = await getSnippet(id);

      setSnippet(data.snippet);

      await incrementView(id);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load snippet");
    } finally {
      setLoading(false);
    }
  };

  const copyCode = async () => {
    if (!snippet) return;

    await navigator.clipboard.writeText(snippet.code);

    await incrementCopy(id);

    setSnippet((prev) => ({
      ...prev,
      copyCount: prev.copyCount + 1,
    }));
  };

  useEffect(() => {
    loadSnippet();
  }, [id]);

  return {
    snippet,
    loading,
    error,
    copyCode,
    refreshSnippet: loadSnippet,
  };
};

export default useSnippet;
