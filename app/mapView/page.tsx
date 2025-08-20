"use client";

import { useMemo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Driver, DriverListData } from "@/shared/Driver";

type MapLibrary = "leaflet" | "google";
type User = "user" | "driver";

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

  if (!userLocation) return <div>Loading your location...</div>;

  // Dynamic imports
  const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
    ssr: false,
  });
  const GoogleMapComp = dynamic(() => import("@/components/GoogleMapComp"), {
    ssr: false,
  });

  return (
    <div className="p-4 space-y-4  ">
      <div className="bg-white rounded-lg p-4 shadow-md h-[600px] overflow-hidden pb-20 ">
        <h2 className="text-lg font-bold m-2 "> {mapLib} Map View </h2>

        {mapLib === "leaflet" ? (
          <LeafletMap drivers={filteredDrivers} userLocation={userLocation} />
        ) : (
          <GoogleMapComp
            drivers={filteredDrivers}
            userLocation={userLocation}
          />
        )}
      </div>

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
