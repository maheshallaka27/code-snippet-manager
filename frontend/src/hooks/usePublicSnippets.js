import { useEffect, useState } from "react";
import { getPublicSnippets } from "../services/snippet.service";

const usePublicSnippets = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPublicSnippets = async () => {
    try {
      setLoading(true);

      const data = await getPublicSnippets();

      setSnippets(data.snippets);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load public snippets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPublicSnippets();
  }, []);

  return {
    snippets,
    loading,
    error,
    refreshPublicSnippets: loadPublicSnippets,
  };
};

export default usePublicSnippets;
