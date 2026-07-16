import { FileCode2, FolderKanban, Heart, Eye, Globe, Copy } from "lucide-react";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

import StatCard from "./StatCard";
import RecentSnippetCard from "./RecentSnippetCard";
import QuickActions from "./QuickActions";

import useDashboard from "../../hooks/useDashboard";
const Dashboard = () => {
  const { stats, recentSnippets, loading, error, refreshDashboard } =
    useDashboard();

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="mt-2 text-slate-500">
          Here's an overview of your snippets and activity.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Snippets"
          value={stats.totalSnippets}
          icon={FileCode2}
          color="bg-blue-600"
        />

        <StatCard
          title="Collections"
          value={stats.totalCollections}
          icon={FolderKanban}
          color="bg-violet-600"
        />

        <StatCard
          title="Favorites"
          value={stats.totalFavorites}
          icon={Heart}
          color="bg-pink-600"
        />

        <StatCard
          title="Public"
          value={stats.totalPublic}
          icon={Globe}
          color="bg-emerald-600"
        />

        <StatCard
          title="Views"
          value={stats.totalViews}
          icon={Eye}
          color="bg-orange-500"
        />

        <StatCard
          title="Copies"
          value={stats.totalCopies}
          icon={Copy}
          color="bg-cyan-600"
        />
      </div>

      {/* Recent Snippets + Quick Actions */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-2xl font-bold text-slate-900">Recent Snippets</h2>

          {recentSnippets.length > 0 ? (
            recentSnippets.map((snippet) => (
              <RecentSnippetCard key={snippet._id} snippet={snippet} />
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h3 className="text-lg font-semibold text-slate-700">
                No snippets found
              </h3>

              <p className="mt-2 text-slate-500">
                Create your first snippet to get started.
              </p>
            </div>
          )}
        </div>

        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;
