import {
  LayoutDashboard,
  FileCode2,
  FolderKanban,
  Heart,
  Globe,
  Bot,
  User,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  const menu = [
    {
      title: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Snippets",
      path: "/snippets",
      icon: FileCode2,
    },
    {
      title: "Collections",
      path: "/collections",
      icon: FolderKanban,
    },
    {
      title: "Favorites",
      path: "/favorites",
      icon: Heart,
    },
    {
      title: "Public",
      path: "/public",
      icon: Globe,
    },
    {
      title: "AI Assistant",
      path: "/ai",
      icon: Bot,
    },
    {
      title: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <aside className="flex h-screen w-64 flex-col bg-slate-900 text-white">
      <div className="border-b border-slate-700 px-6 py-6">
        <h1 className="text-2xl font-bold tracking-wide">AI Snippet</h1>

        <p className="mt-1 text-sm text-slate-400">Code Manager</p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />

              <span className="font-medium">{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-700 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-medium transition hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
