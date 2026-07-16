import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

import useDashboard from "../../hooks/useDashboard";

const Profile = () => {
  const { stats, loading, error } = useDashboard();

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;
  console.log(stats);
  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-white p-8 shadow">
        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white">
            {stats.user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <h1 className="text-4xl font-bold">{stats.user?.name}</h1>

            <p className="mt-2 text-slate-500">{stats.user?.email}</p>

            <p className="mt-2 text-sm text-slate-400">
              Joined {new Date(stats.user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Stat title="Snippets" value={stats.totalSnippets} />

        <Stat title="Collections" value={stats.totalCollections} />

        <Stat title="Favorites" value={stats.totalFavorites} />

        <Stat title="Public" value={stats.totalPublic} />

        <Stat title="Views" value={stats.totalViews} />

        <Stat title="Copies" value={stats.totalCopies} />
      </div>
    </div>
  );
};

const Stat = ({ title, value }) => (
  <div className="rounded-xl bg-white p-6 shadow">
    <p className="text-slate-500">{title}</p>

    <h2 className="mt-2 text-3xl font-bold">{value}</h2>
  </div>
);

export default Profile;
