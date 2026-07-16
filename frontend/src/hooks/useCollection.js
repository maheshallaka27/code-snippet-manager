import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  getCollection,
  addSnippetToCollection,
  removeSnippetFromCollection,
} from "../services/collection.service";

const useCollection = () => {
  const { id } = useParams();

  const [collection, setCollection] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadCollection = async () => {
    try {
      setLoading(true);

      setError("");

      const data = await getCollection(id);

      setCollection(data.collection);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load collection");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCollection();
  }, [id]);

  const addSnippet = async (snippetId) => {
    await addSnippetToCollection(id, snippetId);

    await loadCollection();
  };

  const removeSnippet = async (snippetId) => {
    await removeSnippetFromCollection(id, snippetId);

    await loadCollection();
  };

  return {
    collection,

    loading,

    error,

    refreshCollection: loadCollection,

    addSnippet,

    removeSnippet,
  };
};

export default useCollection;
