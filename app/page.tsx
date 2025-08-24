"use client";

import { useState } from "react";
import MapView from "./mapView/page";
import SearchBar from "@/components/SearchBar";
import CategoryList from "@/components/CategoryList";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col">
      {/* Map wrapper establishes positioning context */}
      <div className="relative w-full h-screen -translate-x-0.5 overflow-hidden">
        {/* The map */}
        <MapView search={search} />

        {/* ✅ Move overlays INSIDE the same wrapper as the map */}
        <div className="pointer-events-none absolute inset-0 z-[650]">
          <div className="pointer-events-auto absolute flex justify-between top-4 left-11 right-10 w-[calc(100%-5.5rem)] max-w-xl">
            <SearchBar
              value={search}
              onChange={setSearch}
              onSearch={(value) => console.log("Search Submitted:", value)}
            />

            <div className="pointer-events-auto absolute left-3/4 max-w-[950px] flex items-center justify-center">
              <CategoryList search={search} setSearch={setSearch} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import MapView from "./mapView/page";
// import SearchBar from "@/components/SearchBar";
// import CategoryList from "@/components/CategoryList";

// export default function Home() {
//   const [search, setSearch] = useState("");

//   return (
//     <div className=" flex flex-col  ">
//       {/* Mp Container  */}
//       <div className="relative w-full h-screen -translate-x-0.5 overflow-hidden  ">
//         <MapView search={search} />
//       </div>

//       {/* Searchbar */}
//       <div className=" absolute flex justify-between top-4 left-11 right-10 w-[calc(100%-5.5rem)] max-w-xl ">
//         <SearchBar
//           value={search}
//           onChange={setSearch}
//           onSearch={(value) => console.log("Search Submitted:", value)}
//         />

//         {/* Categories List */}
//         <div className=" absolute left-3/4 max-w-[950px] flex items-center justify-center   ">
//           <CategoryList search={search} setSearch={setSearch} />
//         </div>
//       </div>
//     </div>
//   );
// }
