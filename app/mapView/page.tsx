"use client";

import { useMemo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { BusinessListData, Business, CategoryListData } from "@/shared/Data";

type MapLibrary = "leaflet" | "google";

// 🔑 Accept search from parent
export default function MapView({ search = "" }: { search: string }) {
  const [mapLib, setMapLib] = useState<MapLibrary>("leaflet");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Get user's location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => console.error("Geolocation error:", err.code, err.message)
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);

  // Filtering businesses by search
  const filteredBusinesses = useMemo<Business[]>(() => {
    // if (!search.trim()) return BusinessListData;
    if (!search || !search.trim()) return BusinessListData;

    const q = search.toLowerCase();

    return BusinessListData.filter((biz) => {
      if (biz.name.toLowerCase().includes(q)) return true;
      if (biz.categoryValue.toLowerCase().includes(q)) return true;

      const cat = CategoryListData.find((c) => c.value === biz.categoryValue);
      if (cat && cat.name.toLowerCase().includes(q)) return true;

      return false;
    });
  }, [search]);

  if (!userLocation) return <div>Loading your location...</div>;

  // Dynamic imports
  const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
    ssr: false,
  });
  const GoogleMapComp = dynamic(() => import("@/components/GoogleMapComp"), {
    ssr: false,
  });

  return (
    <div className="p-4 space-y-4">
      {/* Map container */}
      <div className="bg-white rounded-lg p-4 shadow-md h-[600px] overflow-hidden">
        <h2 className="text-lg font-bold mb-3">Map View ({mapLib})</h2>

        {mapLib === "leaflet" ? (
          <LeafletMap
            businesses={filteredBusinesses}
            userLocation={userLocation}
          />
        ) : (
          <GoogleMapComp
            businesses={filteredBusinesses}
            userLocation={userLocation}
          />
        )}
      </div>

      {/* Map library selector */}
      <select
        value={mapLib}
        onChange={(e) => setMapLib(e.target.value as MapLibrary)}
        className="border p-2 rounded"
      >
        <option value="leaflet">Leaflet</option>
        <option value="google">Google Maps</option>
      </select>
    </div>
  );
}
