import { Plus } from "lucide-react";

const SnippetToolbar = ({
  search,
  setSearch,
  language,
  setLanguage,
  sort,
  setSort,
  onCreate,
}) => {
  return (
    <div className="mb-8 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-3 md:flex-row">
        <input
          type="text"
          placeholder="Search snippets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
        />

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2"
        >
          <option value="">All Languages</option>
          <option value="Java">Java</option>
          <option value="Python">Python</option>
          <option value="JavaScript">JavaScript</option>
          <option value="C++">C++</option>
          <option value="C">C</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="mostViewed">Most Viewed</option>
          <option value="mostCopied">Most Copied</option>
          <option value="favorites">Favorites</option>
        </select>
      </div>

      <button
        onClick={onCreate}
        className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
      >
        <Plus size={18} />
        New Snippet
      </button>
    </div>
  );
};

export default SnippetToolbar;
