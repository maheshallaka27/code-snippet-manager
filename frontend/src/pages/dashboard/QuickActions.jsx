import { Link } from "react-router-dom";

const QuickActions = () => {
  return (
    <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-8">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

      <div className="space-y-3">
        <Link
          to="/snippets"
          className="block rounded-lg bg-blue-600 py-3 text-center text-white hover:bg-blue-700"
        >
          + Create Snippet
        </Link>

        <Link
          to="/collections"
          className="block rounded-lg bg-green-600 py-3 text-center text-white hover:bg-green-700"
        >
          + Create Collection
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
