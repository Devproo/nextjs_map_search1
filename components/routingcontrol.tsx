"use client";

import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

export default function RoutingControl({
  userLocation,
  destination,
}: {
  userLocation?: { lat: number; lng: number };
  destination?: { lat: number; lng: number };
}) {
  const map = useMap();

  useEffect(() => {
    if (!userLocation || !destination) return;

    const control = L.Routing.control({
      waypoints: [
        L.latLng(userLocation.lat, userLocation.lng),
        L.latLng(destination.lat, destination.lng),
      ],
      lineOptions: {
        styles: [{ color: "blue", weight: 5, opacity: 0.8 }],
      },
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
    }).addTo(map);

    return () => {
      map.removeControl(control);
    };
  }, [userLocation, destination, map]);

  return null;
}
