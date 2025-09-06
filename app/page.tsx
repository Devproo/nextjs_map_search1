"use client";
import { useState } from "react";
import MapView from "./mapView/page";
import SearchBar from "@/components/SearchBar";
import CategoryList from "@/components/CategoryList";
import { Category, Instance } from "@/shared/Categories";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedInstance, setSelectedInstance] = useState<Instance | null>(
    null
  );

  return (
    <div className="flex flex-col">
      {/* Map wrapper establishes positioning context */}
      <div className="relative w-full h-screen -translate-x-0.5 overflow-hidden">
        {/* The map */}
        <MapView
          search={search}
          selectedCategory={selectedCategory}
          selectedInstance={selectedInstance}
        />

        {/* ✅ Move overlays INSIDE the same wrapper as the map */}
        <div className="pointer-events-none absolute inset-0 z-[650]">
          <div className="pointer-events-auto absolute flex justify-between top-4 left-11 right-10 w-[calc(100%-5.5rem)] max-w-xl">
            <SearchBar
              value={search}
              onChange={setSearch}
              onSearch={(value) => console.log("Search Submitted:", value)}
            />

            <div className="pointer-events-auto absolute left-3/4 max-w-[950px] flex items-center justify-center">
              <CategoryList
                search={search}
                setSearch={setSearch}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setSelectedInstance={setSelectedInstance}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
