import api from "./axios";

// Get all snippets (pagination + sorting)
export const getSnippets = async (params) => {
  const { data } = await api.get("/snippets", {
    params,
  });
  return data;
};

// Search snippets
export const searchSnippets = async (query) => {
  const { data } = await api.get("/snippets/search", {
    params: {
      q: query,
    },
  });
  return data;
};

// Filter by language
export const filterByLanguage = async (language) => {
  const { data } = await api.get("/snippets/filter/language", {
    params: {
      language,
    },
  });
  return data;
};

// Filter by tag
export const filterByTag = async (tag) => {
  const { data } = await api.get("/snippets/filter/tag", {
    params: {
      tag,
    },
  });
  return data;
};

// Favourite snippets
export const getFavoriteSnippets = async () => {
  const { data } = await api.get("/snippets/favorites");
  return data;
};

// Public snippets
export const getPublicSnippets = async () => {
  const { data } = await api.get("/snippets/public");
  return data;
};

// Get snippet by id
export const getSnippet = async (id) => {
  const { data } = await api.get(`/snippets/${id}`);
  return data;
};

// Create snippet
export const createSnippet = async (snippet) => {
  const { data } = await api.post("/snippets", snippet);
  return data;
};

// Update snippet
export const updateSnippet = async (id, snippet) => {
  const { data } = await api.put(`/snippets/${id}`, snippet);
  return data;
};

// Delete snippet
export const deleteSnippet = async (id) => {
  const { data } = await api.delete(`/snippets/${id}`);
  return data;
};

// Toggle favourite
export const toggleFavourite = async (id) => {
  const { data } = await api.patch(`/snippets/${id}/favorite`);
  return data;
};

// Toggle public visibility
export const togglePublic = async (id) => {
  const { data } = await api.patch(`/snippets/${id}/public`);
  return data;
};

// Increment view count
export const incrementView = async (id) => {
  const { data } = await api.patch(`/snippets/${id}/view`);
  return data;
};

// Increment copy count
export const incrementCopy = async (id) => {
  const { data } = await api.patch(`/snippets/${id}/copy`);
  return data;
};
