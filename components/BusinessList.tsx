// components/BusinessList.tsx
import { BusinessListData } from "@/shared/Data";
import BusinessItem from "./BusinessItem";
import { useState } from "react";

export default function BusinessList({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) {
  const [count, setCount] = useState(3);

  const filtered = BusinessListData.filter((biz) =>
    biz.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 ">
      {filtered.slice(0, count).map((biz) => (
        <div
          key={biz.id}
          onClick={() => setSearch(biz.name)}
          className="cursor-pointer"
        >
          <BusinessItem key={biz.id} data={biz} />
        </div>
      ))}

      <div className="flex gap-3 mt-4">
        {count < filtered.length && (
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
          >
            Show More
          </button>
        )}
        {count > 3 && (
          <button
            onClick={() => setCount(3)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
}
