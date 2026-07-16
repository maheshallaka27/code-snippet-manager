import { useEffect, useState } from "react";
import {
  getDashboardStats,
  getRecentSnippets,
} from "../services/dashboard.services.js";

const useDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentSnippets, setRecentSnippets] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [statsData, snippetsData] = await Promise.all([
        getDashboardStats(),
        getRecentSnippets(),
      ]);

      setStats({ ...statsData.stats, user: statsData.user });
      setRecentSnippets(snippetsData.snippets);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    stats,
    recentSnippets,
    loading,
    error,
    refreshDashboard: loadDashboard,
  };
};

export default useDashboard;
