import { useState } from "react";

const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const execute = async (apiFunction, payload) => {
    try {
      setLoading(true);
      setError("");
      setResponse("");

      const data = await apiFunction(payload);

      setResponse(data.explanation || data.result || "No response received.");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    response,
    error,
    execute,
    setResponse,
  };
};

export default useAI;
