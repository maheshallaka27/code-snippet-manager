import { useEffect, useState } from "react";

import { getFavoriteSnippets } from "../services/snippet.service.js";

const useFavorites = () => {
  const [snippets, setSnippets] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadFavorites = async () => {
    try {
      setLoading(true);

      const data = await getFavoriteSnippets();

      setSnippets(data.snippets);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return {
    snippets,
    loading,
    error,
    refreshFavorites: loadFavorites,
  };
};

export default useFavorites;
