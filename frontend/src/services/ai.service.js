import axiosInstance from "./axios.js";

export const explainCode = async (data) => {
  const res = await axiosInstance.post("/ai/explain", data);
  return res.data;
};

export const optimizeCode = async (data) => {
  const res = await axiosInstance.post("/ai/optimize", data);
  return res.data;
};

export const findBugs = async (data) => {
  const res = await axiosInstance.post("/ai/bugs", data);
  return res.data;
};

export const analyzeComplexity = async (data) => {
  const res = await axiosInstance.post("/ai/complexity", data);
  return res.data;
};

export const generateTestCases = async (data) => {
  const res = await axiosInstance.post("/ai/testcases", data);
  return res.data;
};

export const convertLanguage = async (data) => {
  const res = await axiosInstance.post("/ai/convert", data);
  return res.data;
};
