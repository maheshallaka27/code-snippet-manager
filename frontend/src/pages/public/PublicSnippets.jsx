import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";

import SnippetCard from "../../components/snippets/SnippetCard";

import usePublicSnippets from "../../hooks/usePublicSnippets";

const PublicSnippets = () => {
  const { snippets, loading, error } = usePublicSnippets();

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Public Snippets</h1>

        <p className="mt-2 text-slate-500">Explore snippets shared publicly.</p>
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
            title="No Public Snippets"
            description="No public snippets are available."
          />
        )}
      </div>
    </div>
  );
};

export default PublicSnippets;
