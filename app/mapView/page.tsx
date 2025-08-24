"use client";

import { useMemo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Driver, DriverListData } from "@/shared/Driver";
import { Category, CategoryListData } from "@/shared/Categories";

type MapLibrary = "leaflet" | "google";
type User = "user";
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

  // ✅ Filtering drivers by search
  const filteredDrivers = useMemo<Driver[]>(() => {
    if (!search || !search.trim()) return DriverListData;

    const q = search.toLowerCase();
    return DriverListData.filter((driver) => {
      if (driver.name.toLowerCase().includes(q)) return true;
      if (driver.carModel.toLowerCase().includes(q)) return true;
      if (driver.carType.toLowerCase().includes(q)) return true;
      return false;
    });
  }, [search]);

  // filter categories by search
  const filteredCategories = useMemo<Category[]>(() => {
    if (!search || !search.trim()) return CategoryListData;

    const q = search.toLowerCase();
    return CategoryListData.filter((category) => {
      if (category.name.toLowerCase().includes(q)) return true;
      if (category.value.toLowerCase().includes(q)) return true;
      if (
        category.instances?.some(
          (i) =>
            i.name.toLowerCase().includes(q) ||
            i.rating?.toString().includes(q) ||
            i.distance?.toString().toLowerCase().includes(q) ||
            i.estimatedTime?.toString().toLowerCase().includes(q)
        )
      )
        return true;
      return false;
    });
  }, [search]);

  // Dynamic imports
  const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
    ssr: false,
  });
  const GoogleMapComp = dynamic(() => import("@/components/GoogleMapComp"), {
    ssr: false,
  });

  return (
    <div className="  p-0 space-y-0  ">
      <div className="relative bg-white rounded-lg shadow-md h-screen overflow-hidden">
        {/* Show overlay while loading */}
        {!userLocation && (
          <div className="fixed inset-0 flex items-center justify-center z-[2000] bg-white/80">
            Loading your location...
          </div>
        )}
        {mapLib === "leaflet" ? (
          <LeafletMap
            categories={filteredCategories}
            // drivers={filteredDrivers}
            userLocation={userLocation ?? { lat: 0, lng: 0 }}
          />
        ) : (
          <GoogleMapComp
            categories={filteredCategories}
            // drivers={filteredDrivers}
            userLocation={userLocation ?? { lat: 0, lng: 0 }}
          />
        )}
        {/* Overlay title */}
        <h2 className="absolute bottom-7 right-4 text-lg font-bold z-[1001] bg-white/80 px-2 py-1 rounded">
          {mapLib} Map View
        </h2>
        {/* Overlay select */}
        <select
          value={mapLib}
          onChange={(e) => setMapLib(e.target.value as MapLibrary)}
          className="absolute bottom-6 left-16 border p-2 rounded bg-white/90 z-[1001]"
        >
          <option value="leaflet">Leaflet</option>
          <option value="google">Google Maps</option>
        </select>
      </div>
    </div>
  );
}
