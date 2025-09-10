"use client";
import MapView from "./mapView/page";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="relative w-full h-screen -translate-x-0.5 overflow-hidden">
        {/* Map */}
        <MapView />
      </div>
    </div>
  );
}
