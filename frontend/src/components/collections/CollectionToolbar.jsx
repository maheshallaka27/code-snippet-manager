import { Plus } from "lucide-react";

import Input from "../ui/Input";
import Button from "../ui/Button";

const CollectionToolbar = ({ search, setSearch, onCreate }) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow md:flex-row">
      <div className="flex-1">
        <Input
          placeholder="Search collections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Button
        onClick={onCreate}
        className="w-auto flex items-center gap-2 rounded-xl px-5 py-3"
      >
        <Plus size={18} />
        New Collection
      </Button>
    </div>
  );
};

export default CollectionToolbar;
