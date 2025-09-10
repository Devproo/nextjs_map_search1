"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useCallback, useRef } from "react";

import { Category, Instance } from "@/shared/Categories";

interface GoogleMapProps {
  categories?: Category[];
  userLocation?: { lat: number; lng: number };
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  selectedInstance: Instance | null;
  setSelectedInstance: React.Dispatch<React.SetStateAction<Instance | null>>;
}

export default function GoogleMapComp({
  userLocation,
  categories,
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  selectedInstance,
  setSelectedInstance,
}: GoogleMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      const bounds = new google.maps.LatLngBounds();
      [
        ...(categories?.map((d) => ({ lat: d.lat, lng: d.lng })) || []),
        userLocation,
      ]

        .filter(Boolean)
        .forEach((pos) => bounds.extend(pos as google.maps.LatLngLiteral));

      if (!bounds.isEmpty()) map.fitBounds(bounds);
    },
    [categories, userLocation]
  );

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
      <GoogleMap
        onLoad={onLoad}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={userLocation ?? { lat: 0, lng: 0 }}
        zoom={2}
      >
        {userLocation && (
          <Marker position={userLocation} title="Your Location" />
        )}

        {categories?.flatMap(
          (category) =>
            category.instances?.map((instance) => (
              <Marker
                key={instance.id}
                position={{ lat: instance.lat, lng: instance.lng }}
                title={instance.name}
              />
            )) || []
        )}
      </GoogleMap>
    </LoadScript>
  );
}
