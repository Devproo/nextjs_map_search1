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

// "use client";

// import { useState } from "react";
// import { CategoryListData, Category, Instance } from "@/shared/Categories";
// import { fetchInstancesNearby } from "@/services/osmSearch";
// import CategoryItem from "./CategoryItem";

// type Props = {
//   search: string;
//   setSearch: (v: string) => void;
//   selectedCategory: Category | null;
//   setSelectedCategory: (c: Category | null) => void;
//   setSelectedInstance: (i: Instance | null) => void;
//   /**
//    * Optional callback to receive search results (e.g. parent can render them on map/list)
//    */
//   onResults?: (results: Instance[], searchWord: string) => void;
// };

// export default function CategoryList({
//   search,
//   setSearch,
//   selectedCategory,
//   setSelectedCategory,
//   setSelectedInstance,
//   onResults,
// }: Props) {
//   const [categories, setCategories] = useState<Category[]>(CategoryListData);
//   const [loadingMap, setLoadingMap] = useState<Record<number, boolean>>({});

//   function getPos(): Promise<{ lat: number; lng: number }> {
//     const defaultLat = 30.0444;
//     const defaultLng = 31.2357;
//     return new Promise((resolve) => {
//       if (!navigator?.geolocation)
//         return resolve({ lat: defaultLat, lng: defaultLng });
//       navigator.geolocation.getCurrentPosition(
//         (p) => resolve({ lat: p.coords.latitude, lng: p.coords.longitude }),
//         () => resolve({ lat: defaultLat, lng: defaultLng }),
//         { timeout: 5000 }
//       );
//     });
//   }

//   async function handleHover(cat: Category) {
//     // already loaded
//     if (cat.instances && cat.instances.length > 0) return;
//     setLoadingMap((s) => ({ ...s, [cat.id]: true }));

//     try {
//       const pos = await getPos();
//       const raw = await fetchInstancesNearby(
//         cat.value || cat.name,
//         pos,
//         0.08,
//         6
//       );
//       const instances: Instance[] = raw.map((r, i) => ({
//         id: Number(`${Date.now().toString().slice(-6)}${i}`),
//         name: (r.display_name || "").split(",")[0],
//         lat: parseFloat(String(r.lat)),
//         lng: parseFloat(String(r.lon)),
//         categoryId: cat.id,
//       }));
//       setCategories((prev) =>
//         prev.map((c) => (c.id === cat.id ? { ...c, instances } : c))
//       );
//     } catch (err) {
//       console.error("Hover fetch error:", err);
//     } finally {
//       setLoadingMap((s) => ({ ...s, [cat.id]: false }));
//     }
//   }

//   // run a full search (used on click of category OR instance)
//   async function runSearchWord(word: string, cat?: Category, inst?: Instance) {
//     setSearch(word);
//     if (cat) setSelectedCategory(cat);
//     if (inst) setSelectedInstance(inst);

//     const pos = await getPos();
//     try {
//       const raw = await fetchInstancesNearby(word, pos, 0.12, 20);
//       const results: Instance[] = raw.map((r, i) => ({
//         id: Number(`${Date.now().toString().slice(-6)}${i}`),
//         name: (r.display_name || "").split(",")[0],
//         lat: parseFloat(String(r.lat)),
//         lng: parseFloat(String(r.lon)),
//         categoryId: cat ? cat.id : inst ? inst.categoryId : -1,
//       }));
//       // cache into category if clicked on a category
//       if (cat) {
//         setCategories((prev) =>
//           prev.map((c) =>
//             c.id === cat.id ? { ...c, instances: results.slice(0, 10) } : c
//           )
//         );
//       }
//       if (onResults) onResults(results, word);
//     } catch (err) {
//       console.error("Search fetch error:", err);
//       if (onResults) onResults([], word);
//     }
//   }

//   return (
//     <div className="flex flex-row gap-6 mb-5 overflow-x-auto scrollbar-hide w-full">
//       {categories.map((cat) => (
//         <div
//           key={cat.id}
//           className="group flex-shrink-0 relative"
//           onMouseEnter={() => handleHover(cat)}
//         >
//           <div
//             onClick={() => runSearchWord(cat.name, cat)}
//             className="cursor-pointer"
//           >
//             <CategoryItem category={cat} />
//           </div>

//           {/* Hover popup */}
//           <div className="absolute top-full left-0 mt-2 hidden group-hover:flex bg-white shadow-lg rounded-lg p-2 z-10 min-w-[200px]">
//             <div className="w-full">
//               {loadingMap[cat.id] ? (
//                 <div className="p-2">Loading…</div>
//               ) : cat.instances && cat.instances.length > 0 ? (
//                 <ul className="space-y-1">
//                   {cat.instances.slice(0, 6).map((inst) => (
//                     <li
//                       key={inst.id}
//                       className="px-2 py-1 hover:bg-gray-100 cursor-pointer rounded"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         runSearchWord(inst.name, cat, inst);
//                       }}
//                     >
//                       {inst.name}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <div className="p-2 text-sm text-gray-500">No preview</div>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
