"use client";

import { useMemo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Category, CategoryListData, Instance } from "@/shared/Categories";

type MapLibrary = "leaflet" | "google";

export default function MapView() {
  const [mapLib, setMapLib] = useState<MapLibrary>("leaflet");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Local state for search & selections
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedInstance, setSelectedInstance] = useState<Instance | null>(
    null
  );

  // Get user's location on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      (err) => console.error("Geolocation error:", err.code, err.message)
    );
  }, []);

  // Filter categories based on search input
  const filteredCategories = useMemo(() => {
    if (!search.trim()) return CategoryListData;

    const query = search.toLowerCase();

    return CategoryListData.filter((category) => {
      const matchesCategory =
        category.name.toLowerCase().includes(query) ||
        category.value.toLowerCase().includes(query);

      const matchesInstances =
        category.instances?.some(
          (i) =>
            i.name.toLowerCase().includes(query) ||
            i.rating?.toString().includes(query) ||
            i.distance?.toString().includes(query) ||
            i.estimatedTime?.toString().includes(query)
        ) ?? false;

      return matchesCategory || matchesInstances;
    });
  }, [search]);

  // Dynamic imports for map components
  const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
    ssr: false,
  });
  const GoogleMapComp = dynamic(() => import("@/components/GoogleMapComp"), {
    ssr: false,
  });

  return (
    <div className="h-screen relative">
      {/* Loading overlay while fetching user location */}
      {!userLocation && (
        <div className="fixed inset-0 flex items-center justify-center z-[2000] bg-white/80">
          Loading your location...
        </div>
      )}

      {/* Render selected map library */}
      {mapLib === "leaflet" ? (
        <LeafletMap
          categories={filteredCategories}
          userLocation={userLocation ?? { lat: 0, lng: 0 }}
        />
      ) : (
        <GoogleMapComp
          categories={filteredCategories}
          userLocation={userLocation ?? { lat: 0, lng: 0 }}
          // search={search}
          // setSearch={setSearch}
          // selectedCategory={selectedCategory}
          // setSelectedCategory={setSelectedCategory}
          // selectedInstance={selectedInstance}
          // setSelectedInstance={setSelectedInstance}
        />
      )}

      {/* Map library label */}
      <h2 className="absolute bottom-7 right-4 z-[1001] bg-white/80 px-2 py-1 rounded font-bold text-lg">
        {mapLib} Map View
      </h2>

      {/* Map library selector */}
      <select
        value={mapLib}
        onChange={(e) => setMapLib(e.target.value as MapLibrary)}
        className="absolute bottom-6 left-16 z-[1001] border p-2 rounded bg-white/90"
      >
        <option value="leaflet">Leaflet</option>
        <option value="google">Google Maps</option>
      </select>
    </div>
  );
}
