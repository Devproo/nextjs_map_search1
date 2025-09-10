"use client";
import { CategoryListData, Category, Instance } from "@/shared/Categories";
import CategoryItem from "./CategoryItem";

interface CategoryListProps {
  search: string;
  setSearch: (value: string) => void;
  selectedCategory: Category | null;
  setSelectedCategory: (cat: Category | null) => void;
  setSelectedInstance: (inst: Instance | null) => void;
}

export default function CategoryList({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  setSelectedInstance,
}: CategoryListProps) {
  // If a category or instance is selected, show all categories
  // Otherwise, filter based on search input
  const shouldShowAll =
    selectedCategory !== null || setSelectedInstance !== null;

  const filtered = shouldShowAll
    ? CategoryListData
    : CategoryListData.filter(
        (cat) =>
          cat.name.toLowerCase().includes(search.toLowerCase()) ||
          cat.instances?.some((inst) =>
            inst.name.toLowerCase().includes(search.toLowerCase())
          )
      );

  return (
    <div className="relative flex flex-row  gap-6 mb-5 overflow-x-auto scrollbar-hide w-full">
      {filtered.map((cat: Category) => (
        <div key={cat.id} className="group flex-shrink-0">
          {/* Main category item */}
          <div
            onClick={() => {
              setSearch(cat.name);
              setSelectedCategory(cat);
              setSelectedInstance(null);
            }}
            className={
              selectedCategory?.id === cat.id
                ? "border-gray-500 hover:bg-gray-100 hover:text-gray-600 rounded"
                : ""
            }
          >
            <CategoryItem category={cat} />
          </div>

          {/* Dropdown of instances */}
          {cat.instances && cat.instances.length > 0 && (
            <div className="top-full left-0 mt-2 hidden group-hover:flex bg-white shadow-lg rounded-xl p-2 z-10 min-w-[150px]">
              <ul className="space-y-2">
                {cat.instances.map((instance: Instance) => (
                  <li
                    key={instance.id}
                    onClick={() => {
                      setSearch(instance.name);
                      setSelectedCategory(cat);
                      setSelectedInstance(instance);
                    }}
                    className="px-3 py-1 hover:bg-gray-100 rounded-lg cursor-pointer"
                  >
                    {instance.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
