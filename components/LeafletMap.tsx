"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

import { Category, Instance } from "@/shared/Categories";
import { Filter } from "lucide-react";

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

interface LeafletMapProps {
  categories?: Category[];
  userLocation?: { lat: number; lng: number };
}

function FitBounds({ categories, userLocation }: LeafletMapProps) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds([]);

    categories?.forEach((category) => {
      category.instances?.forEach((instance) => {
        bounds.extend([instance.lat, instance.lng]);
      });
    });

    if (userLocation) bounds.extend([userLocation.lat, userLocation.lng]);

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [categories, userLocation, map]);

  return null;
}

export default function LeafletMap({
  userLocation,
  categories,
}: LeafletMapProps) {
  const [search, setSearch] = useState("");
  return (
    <MapContainer
      center={userLocation ? [userLocation.lat, userLocation.lng] : [0, 0]}
      zoom={2}
      scrollWheelZoom
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      className="h-full w-full"
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

      {/* Instance markers */}
      {categories?.map((category) =>
        category.instances?.map((instance) => (
          <Marker key={instance.id} position={[instance.lat, instance.lng]}>
            <Popup>
              <div className="space-y-1">
                <h3 className="font-bold text-lg">{instance.name}</h3>
                <p>⭐ {instance.rating ?? "No rating"}</p>
                {instance.distance !== undefined && (
                  <p>📍 {instance.distance} km away</p>
                )}
                {instance.estimatedTime !== undefined && (
                  <p>⏱ ETA: {instance.estimatedTime} mins</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))
      )}

      <FitBounds categories={categories} userLocation={userLocation} />
    </MapContainer>
  );
}
