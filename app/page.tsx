"use client";

import { useState } from "react";
import MapView from "./mapView/page";
import SearchBar from "@/components/SearchBar";
import CategoryList from "@/components/CategoryList";
import BusinessList from "@/components/BusinessList";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-6 py-6 md:px-10 w-full mt-10 md:mt-0 gap-6 bg-gray-300">
      <div>
        <SearchBar value={search} onChange={setSearch} />
        <CategoryList search={search} setSearch={setSearch} />
        <BusinessList search={search} setSearch={setSearch} />
      </div>
      <MapView search={search} />
    </div>
  );
}
