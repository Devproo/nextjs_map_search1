// "use client";

// import { useMap } from "react-leaflet";
// import { useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import { truncate } from "fs/promises";

// interface RoutingControlProps {
//   userLocation?: { lat: number; lng: number };
//   destination?: { lat: number; lng: number };
// }

// export default function RoutingControl({
//   userLocation,
//   destination,
// }: RoutingControlProps) {
//   const map = useMap();
//   const controlRef = useRef<L.Routing.Control | null>(null);

//   useEffect(() => {
//     // Cleanup previous control
//     if (controlRef.current) {
//       const ctrl = controlRef.current as any;
//       if (ctrl._line) map.removeLayer(ctrl._line);
//       if (ctrl._markers) ctrl._markers.forEach((m: any) => map.removeLayer(m));
//       map.removeControl(ctrl);
//       controlRef.current = null;
//     }

//     if (!userLocation || !destination) return;

//     // Create new routing control
//     const control = L.Routing.control({
//       waypoints: [
//         L.latLng(userLocation.lat, userLocation.lng),
//         L.latLng(destination.lat, destination.lng),
//       ],
//       router: L.Routing.osrmv1({
//         serviceUrl: "https://router.project-osrm.org/route/v1",
//         profile: "car",
//       }),
//       lineOptions: {
//         styles: [
//           { color: "#3b82f6", weight: 4, opacity: 0.7, interactive: false },
//         ],
//         addWaypoints: false,
//         extendToWaypoints: false,
//         missingRouteTolerance: 0,
//       },
//       addWaypoints: false,
//       draggableWaypoints: false,
//       fitSelectedRoutes: false,
//       show: false,
//       createMarker: () => null,
//       routeWhileDragging: false,
//     }).addTo(map);

//     control.on("routesfound", (e: any) => {
//       if (e.routes?.length) {
//         const route = e.routes[0];
//         console.log(
//           `Distance: ${(route.summary.totalDistance / 1000).toFixed(2)} km`,
//           `Time: ${Math.round(route.summary.totalTime / 60)} mins`
//         );
//       }
//     });

//     control.on("routingerror", (e: any) => console.error("Routing error:", e));

//     // Make container pointer-events none so popups still work
//     const container = document.querySelector(".leaflet-routing-container");
//     if (container) (container as HTMLElement).style.pointerEvents = "none";

//     controlRef.current = control;

//     // Cleanup on unmount or dependency change
//     return () => {
//       const ctrl = controlRef.current as any;
//       if (ctrl) {
//         if (ctrl._line) map.removeLayer(ctrl._line);
//         if (ctrl._markers)
//           ctrl._markers.forEach((m: any) => map.removeLayer(m));
//         map.removeControl(ctrl);
//       }
//       controlRef.current = null;
//     };
//   }, [
//     userLocation?.lat,
//     userLocation?.lng,
//     destination?.lat,
//     destination?.lng,
//     map,
//   ]);

//   return null;
// }

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

    // Create routing control
    const control = L.Routing.control({
      waypoints: [
        L.latLng(userLocation.lat, userLocation.lng),
        L.latLng(destination.lat, destination.lng),
      ],

      router: L.Routing.osrmv1({
        profile: "car", // driving route
      }),
      lineOptions: {
        styles: [{ color: "blue", weight: 5, opacity: 0.8 }],
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
    }).addTo(map);

    // Event listener
    control.on("routesfound", (e: any) => {
      console.log("Routes found:", e.routes);
    });

    return () => {
      if (map.hasLayer(control)) {
        map.removeControl(control);
      }
    };
  }, [
    userLocation?.lat,
    userLocation?.lng,
    destination?.lat,
    destination?.lng,
    map,
  ]);

  return null;
}
