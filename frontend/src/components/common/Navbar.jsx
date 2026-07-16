import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4 shadow-sm">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back 👋</h1>

        <p className="mt-1 text-slate-500">
          Manage your code snippets efficiently.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>

        <div>
          <p className="font-semibold text-slate-900">{user?.name || "User"}</p>

          <p className="text-sm text-slate-500">{user?.email}</p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
