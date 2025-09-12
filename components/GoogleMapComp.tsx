"use client";

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";

import { Category, Instance } from "@/shared/Categories";
import CategoryList from "./CategoryList";
import SearchBar from "./SearchBar";

interface GoogleMapProps {
  categories?: Category[];
  userLocation?: { lat: number; lng: number };
  // search: string;
  // setSearch: React.Dispatch<React.SetStateAction<string>>;
  // selectedCategory: Category | null;
  // setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  // selectedInstance: Instance | null;
  // setSelectedInstance: React.Dispatch<React.SetStateAction<Instance | null>>;
}

export default function GoogleMapComp({
  userLocation,
  categories,
}: // selectedCategory,
// search,
// setSearch,
// setSelectedCategory,
// selectedInstance,
// setSelectedInstance,
GoogleMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);

  // Local state here ⬇️ (not passed from parent)
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedInstance, setSelectedInstance] = useState<Instance | null>(
    null
  );
  const [activeInstance, setActiveInstance] = useState<Instance | null>(null);
  // Figure out which instances to show
  let visibleInstances: Instance[] = [];
  if (selectedInstance) visibleInstances = [selectedInstance];
  else if (selectedCategory)
    visibleInstances = selectedCategory.instances ?? [];

  // Save map reference on load
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // Update bounds when visibleInstances or userLocation changes
  useEffect(() => {
    if (!mapRef.current) return;

    const bounds = new google.maps.LatLngBounds();
    [
      ...(visibleInstances.map((d) => ({ lat: d.lat, lng: d.lng })) || []),
      userLocation,
    ]
      .filter(Boolean)
      .forEach((pos) => bounds.extend(pos as google.maps.LatLngLiteral));

    if (!bounds.isEmpty()) {
      mapRef.current.fitBounds(bounds);
    }
  }, [visibleInstances, userLocation]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
      <div className="h-full w-full relative">
        {/* Overlay UI */}
        <div className="absolute top-6 left-12 right-6 z-[500] flex flex-col md:flex-row justify-between gap-6">
          {/* Search Bar */}
          <div className="w-full md:max-w-md">
            <SearchBar
              value={search}
              onChange={setSearch}
              onSearch={(v) => console.log("Search Submitted:", v)}
            />
          </div>

          {/* Category List */}
          <div className="w-full md:min-w-[900px]">
            <CategoryList
              search={search}
              setSearch={setSearch}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setSelectedInstance={setSelectedInstance}
            />
          </div>
        </div>
        <GoogleMap
          onLoad={onLoad}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={userLocation ?? { lat: 0, lng: 0 }}
          zoom={2}
        >
          {/* User marker */}
          {userLocation && (
            <Marker position={userLocation} title="Your Location">
              <InfoWindow>
                <strong>Your Location</strong>
              </InfoWindow>
            </Marker>
          )}

          {/* Instance markers + popups */}
          {categories?.flatMap(
            (category) =>
              category.instances?.map((instance) => (
                <Marker
                  key={instance.id}
                  position={{ lat: instance.lat, lng: instance.lng }}
                  title={instance.name}
                  onClick={() => {
                    setSelectedInstance(instance);
                    setActiveInstance(instance);
                  }}
                >
                  {activeInstance?.id === instance.id && (
                    <InfoWindow
                      position={{ lat: instance.lat, lng: instance.lng }}
                      onCloseClick={() => setActiveInstance(null)}
                    >
                      <div className="space-y-1 overflow-auto p-2 min-w-[200px]">
                        <h3 className="font-bold text-lg">{instance.name}</h3>
                        <p>⭐ {instance.rating ?? "No rating"}</p>
                        {instance.distance !== undefined && (
                          <p>📍 {instance.distance} km away</p>
                        )}
                        {instance.estimatedTime !== undefined && (
                          <p>⏱ ETA: {instance.estimatedTime} mins</p>
                        )}
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              )) || []
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}
