"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Business } from "@/shared/Data";
import L from "leaflet";
import { useEffect } from "react";

// Fix default icon issue in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

interface LeafletMapProps {
  businesses: Business[];
  userLocation?: { lat: number; lng: number };
}

function FitBounds({ businesses, userLocation }: LeafletMapProps) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds([]);

    businesses.forEach((biz) => bounds.extend([biz.lat, biz.lng]));
    if (userLocation) bounds.extend([userLocation.lat, userLocation.lng]);

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [businesses, userLocation, map]);

  return null;
}

export default function LeafletMap({
  businesses,
  userLocation,
}: LeafletMapProps) {
  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom
      className="h-full w-full "
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* User marker */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>
            <strong>Your Location</strong>
          </Popup>
        </Marker>
      )}
      {/* Business markers */}
      {businesses.map((biz) => (
        <Marker key={biz.id} position={[biz.lat, biz.lng]}>
          <Popup>
            <strong>{biz.name}</strong>
            <br />
            {biz.address}
          </Popup>
        </Marker>
      ))}
      <FitBounds businesses={businesses} userLocation={userLocation} />
    </MapContainer>
  );
}
