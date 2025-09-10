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
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
        profile: "car",
      }),
      lineOptions: {
        styles: [{ color: "blue", weight: 5, opacity: 0.8 }],
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      show: false,
    }).addTo(map);

    control.on("routesfound", (e: any) => {
      console.log("Routes fount", e.routes);
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

// "use client";

// import { useMap } from "react-leaflet";
// import { useEffect } from "react";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// export default function RoutingControl({
//   userLocation,
//   destination,
// }: {
//   userLocation?: { lat: number; lng: number };
//   destination?: { lat: number; lng: number };
// }) {
//   const map = useMap();

//   useEffect(() => {
//     if (!userLocation || !destination) return;

//     // Create routing control
//     const control = L.Routing.control({
//       waypoints: [
//         L.latLng(userLocation.lat, userLocation.lng),
//         L.latLng(destination.lat, destination.lng),
//       ],

//       router: L.Routing.osrmv1({
//         profile: "car", // driving route
//       }),
//       lineOptions: {
//         styles: [{ color: "blue", weight: 5, opacity: 0.8 }],
//       },
//       addWaypoints: false,
//       draggableWaypoints: false,
//       fitSelectedRoutes: true,
//       show: false,
//     }).addTo(map);

//     // Event listener
//     control.on("routesfound", (e: any) => {
//       console.log("Routes found:", e.routes);
//     });

//     return () => {
//       if (map.hasLayer(control)) {
//         map.removeControl(control);
//       }
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
