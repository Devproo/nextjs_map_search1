// mapView/page.tsx
"use client";

import { useMemo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Category, CategoryListData } from "@/shared/Categories";
import { Instance } from "@/shared/Categories";

type MapLibrary = "leaflet" | "google";

interface MapViewProps {
  search?: string;
  selectedCategory: Category | null;
  selectedInstance: Instance | null;
}

export default function MapView({
  search = "",
  selectedCategory,
  selectedInstance,
}: MapViewProps) {
  const [mapLib, setMapLib] = useState<MapLibrary>("leaflet");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Get user's location on mount
  useEffect(() => {
    if (!navigator.geolocation)
      return console.error("Geolocation not supported");

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
          selectedCategory={selectedCategory}
          selectedInstance={selectedInstance}
        />
      ) : (
        <GoogleMapComp
          categories={filteredCategories}
          userLocation={userLocation ?? { lat: 0, lng: 0 }}
          selectedCategory={selectedCategory}
          selectedInstance={selectedInstance}
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
