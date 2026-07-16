import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";
import Snippets from "../pages/snippets/Snippets";

import Collections from "../pages/collections/Collections";
import CollectionDetails from "../pages/collections/CollectionDetails";
import Favorites from "../pages/favorites/Favorites";
import Profile from "../pages/profile/Profile";
import Public from "../pages/public/PublicSnippets";
import SnippetDetails from "../pages/snippets/SnippetDetails";
import GuestRoute from "../components/common/GuestRoute";
const AppRoutes = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      {/*protected routes*/}

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/snippets" element={<Snippets />} />
        <Route path="/snippets/:id" element={<SnippetDetails />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:id" element={<CollectionDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/public" element={<Public />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
