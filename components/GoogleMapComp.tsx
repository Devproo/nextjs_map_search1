"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import type { Business } from "@/shared/Data";
import { useCallback, useRef } from "react";

interface GoogleMapProps {
  businesses: Business[];
  userLocation?: { lat: number; lng: number };
}

export default function GoogleMapComp({
  businesses,
  userLocation,
}: GoogleMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;

      const bounds = new window.google.maps.LatLngBounds();
      businesses.forEach((biz) =>
        bounds.extend({ lat: biz.lat, lng: biz.lng })
      );
      if (userLocation) bounds.extend(userLocation);

      if (!bounds.isEmpty()) {
        map.fitBounds(bounds);
      }
    },
    [businesses, userLocation]
  );

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
      <GoogleMap
        onLoad={onLoad}
        mapContainerStyle={{ height: "100%", width: "100%" }}
        center={userLocation || { lat: 0, lng: 0 }}
        zoom={2}
      >
        {/* User marker */}
        {userLocation && (
          <Marker position={userLocation} title="Your Location" />
        )}

        {/* Business markers */}
        {businesses.map((biz) => (
          <Marker
            key={biz.id}
            position={{ lat: biz.lat, lng: biz.lng }}
            title={biz.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
