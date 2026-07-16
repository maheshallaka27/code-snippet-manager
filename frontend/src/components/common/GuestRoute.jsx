import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const GuestRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
