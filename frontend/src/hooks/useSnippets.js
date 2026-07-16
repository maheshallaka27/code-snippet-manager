import { useEffect, useState } from "react";
import {
  getSnippets,
  searchSnippets,
  filterByLanguage,
  deleteSnippet,
  toggleFavourite,
  togglePublic,
} from "../services/snippet.service.js";

const useSnippets = () => {
  const [snippets, setSnippets] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  const [limit] = useState(10);

  const [sort, setSort] = useState("latest");

  const [search, setSearch] = useState("");

  const [language, setLanguage] = useState("");

  const [totalPages, setTotalPages] = useState(1);

  const loadSnippets = async () => {
    try {
      setLoading(true);
      setError("");

      let data;

      if (search.trim()) {
        data = await searchSnippets(search);
      } else if (language) {
        data = await filterByLanguage(language);
      } else {
        data = await getSnippets({
          page,
          limit,
          sort,
        });
      }

      setSnippets(data.snippets);

      if (data.totalPages) {
        setTotalPages(data.totalPages);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load snippets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSnippets();
  }, [page, sort, search, language]);
  const removeSnippet = async (id) => {
    await deleteSnippet(id);
    await loadSnippets();
  };
  const favoriteSnippet = async (id) => {
    await toggleFavourite(id);
    await loadSnippets();
  };
  const publicSnippet = async (id) => {
    await togglePublic(id);
    await loadSnippets();
  };
  return {
    snippets,
    loading,
    error,

    page,
    setPage,

    limit,

    sort,
    setSort,

    search,
    setSearch,

    language,
    setLanguage,

    totalPages,

    refreshSnippets: loadSnippets,
    removeSnippet,
    favoriteSnippet,
    publicSnippet,
  };
};

export default useSnippets;
