import api from "./axios.js";

export const getDashboardStats = async () => {
  const { data } = await api.get("/dashboard/stats");
  return data;
};

export const getRecentSnippets = async () => {
  const { data } = await api.get("/dashboard/recent-snippets");
  return data;
};
