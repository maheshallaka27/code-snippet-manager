import { useEffect, useState } from "react";
import {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
} from "../services/collection.service";

const useCollections = () => {
  const [collections, setCollections] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const loadCollections = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCollections();

      let list = data.collections || [];

      if (search.trim()) {
        list = list.filter((collection) =>
          collection.name.toLowerCase().includes(search.toLowerCase()),
        );
      }

      setCollections(list);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load collections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCollections();
  }, [search]);

  const addCollection = async (payload) => {
    await createCollection(payload);
    await loadCollections();
  };

  const editCollection = async (id, payload) => {
    await updateCollection(id, payload);
    await loadCollections();
  };

  const removeCollection = async (id) => {
    await deleteCollection(id);
    await loadCollections();
  };

  return {
    collections,

    loading,

    error,

    search,

    setSearch,

    refreshCollections: loadCollections,

    addCollection,

    editCollection,

    removeCollection,
  };
};

export default useCollections;
