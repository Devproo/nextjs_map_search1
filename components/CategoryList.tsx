// components/CategoryList.tsx

import { CategoryListData } from "@/shared/Data";
import CategoryItem from "./CategoryItem";

export default function CategoryList({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) {
  const filtered = CategoryListData.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-[20px] mt-3">Select Your Fav Category</h2>
      <div className="flex gap-6 mb-5 overflow-x-auto scrollbar-hide ">
        {filtered.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSearch(cat.name)}
            className="cursor-pointer flex-shrink-0"
          >
            <CategoryItem category={cat} />
          </div>
        ))}
      </div>
    </div>
  );
}
