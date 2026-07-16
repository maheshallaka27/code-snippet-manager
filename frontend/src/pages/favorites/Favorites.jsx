import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";

import SnippetCard from "../../components/snippets/SnippetCard";

import useFavorites from "../../hooks/useFavorites.js";

const Favorites = () => {
  const { snippets, loading, error } = useFavorites();

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Favorite Snippets</h1>

        <p className="mt-2 text-slate-500">Your starred snippets.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {snippets.length ? (
          snippets.map((snippet) => (
            <SnippetCard
              key={snippet._id}
              snippet={snippet}
              showEdit={false}
              showDelete={false}
            />
          ))
        ) : (
          <EmptyState
            title="No Favorites"
            description="Favorite snippets will appear here."
          />
        )}
      </div>
    </div>
  );
};

export default Favorites;
