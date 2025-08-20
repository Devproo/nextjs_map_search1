"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { Driver } from "@/shared/Driver";

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

interface LeafletMapProps {
  drivers: Driver[]; // ✅ fixed typing
  userLocation?: { lat: number; lng: number };
}

function FitBounds({ drivers, userLocation }: LeafletMapProps) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds([]);

    drivers.forEach((driver) => bounds.extend([driver.lat, driver.lng]));
    if (userLocation) bounds.extend([userLocation.lat, userLocation.lng]);

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [drivers, userLocation, map]);

  return null;
}

export default function LeafletMap({ drivers, userLocation }: LeafletMapProps) {
  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom
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

      {/* Driver markers */}
      {drivers.map((driver) => (
        <Marker key={driver.id} position={[driver.lat, driver.lng]}>
          {/* <Popup>
            <div className="space-y-1">
              <h3 className="font-bold text-lg">{driver.name}</h3>
              <p>🚗 {driver.carModel}</p>
              <p>🚗 {driver.carType}</p>
              <p>⭐ {driver.rating}</p>
              <p>📍 {driver.distance} km away</p>
              <p>⏱ ETA: {driver.estimatedTime} mins</p>
            </div>
          </Popup> */}
          <Popup>
            <div className="space-y-1">
              <h3 className="font-bold text-lg">{driver.name}</h3>
              <p>
                Car: {driver.carModel} ({driver.carType})
              </p>
              <p>⭐ Rating: {driver.rating}</p>
              {driver.distance !== undefined && (
                <p>📍 Distance: {driver.distance} km</p>
              )}
              {driver.estimatedTime !== undefined && (
                <p>⏱ ETA: {driver.estimatedTime} mins</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      <FitBounds drivers={drivers} userLocation={userLocation} />
    </MapContainer>
  );
}
