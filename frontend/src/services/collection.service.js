import api from "./axios.js";

export const getCollections = async () => {
  const { data } = await api.get("/collections");
  return data;
};

export const createCollection = async (payload) => {
  const { data } = await api.post("/collections", payload);
  return data;
};

export const getCollection = async (id) => {
  const { data } = await api.get(`/collections/${id}`);
  return data;
};

export const updateCollection = async (id, payload) => {
  const { data } = await api.put(`/collections/${id}`, payload);
  return data;
};

export const deleteCollection = async (id) => {
  const { data } = await api.delete(`/collections/${id}`);
  return data;
};

export const addSnippetToCollection = async (collectionId, snippetId) => {
  const { data } = await api.post(
    `/collections/${collectionId}/snippets/${snippetId}`,
  );

  return data;
};

export const removeSnippetFromCollection = async (collectionId, snippetId) => {
  const { data } = await api.delete(
    `/collections/${collectionId}/snippets/${snippetId}`,
  );

  return data;
};
