("use client");
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import { useEffect, useMemo, useState, memo } from "react";
import { Category, Instance } from "@/shared/Categories";
import CategoryList from "@/components/CategoryList";
import SearchBar from "./SearchBar";
import RoutingControl from "./routingcontrol";

// Fix Leaflet default icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Fit map bounds to user + instances
function FitBounds({
  userLocation,
  instances,
}: {
  userLocation?: { lat: number; lng: number };
  instances: Instance[];
}) {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds([]);
    if (userLocation) bounds.extend([userLocation.lat, userLocation.lng]);
    instances.forEach((i) => bounds.extend([i.lat, i.lng]));
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
    }
  }, [userLocation, instances, map]);

  return null;
}

interface LeafletMapProps {
  userLocation?: { lat: number; lng: number };
  categories?: Category[];
}

function LeafletMapComponent({ userLocation, categories }: LeafletMapProps) {
  // Local state here ⬇️ (not passed from parent)
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedInstance, setSelectedInstance] = useState<Instance | null>(
    null
  );

  // Compute visible instances
  const visibleInstances = useMemo(
    () =>
      selectedInstance ? [selectedInstance] : selectedCategory?.instances ?? [],
    [selectedInstance, selectedCategory]
  );
  const handleSearch = (query: string) => {
    setSearch(query);
    const q = query.toLowerCase();

    const cat = categories?.find((c) => c.name.toLowerCase() === q) ?? null;
    const inst =
      categories
        ?.flatMap((c) => c.instances ?? [])
        .find((i) => i.name.toLowerCase() === q) ?? null;
    setSelectedCategory(cat && !inst ? cat : null);
    setSelectedInstance(inst && !cat ? inst : null);
  };

  return (
    <div className="h-full w-full relative">
      {/* Controls */}
      <div className="absolute top-6 left-12 right-6 z-[500] flex flex-col md:flex-row justify-between gap-6">
        <div className="w-full md:max-w-md">
          <SearchBar
            value={search}
            onChange={setSearch}
            // onSearch={(v) => console.log("Search:", v)}
            onSearch={handleSearch}
          />
        </div>

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

      {/* Map */}
      <MapContainer
        center={userLocation ? [userLocation.lat, userLocation.lng] : [0, 0]}
        zoom={16}
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

        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            zIndexOffset={1000}
          >
            <Popup>
              <strong>Your Location</strong>
            </Popup>
          </Marker>
        )}

        {visibleInstances.map((instance, index) => (
          <Marker
            key={instance.id}
            position={[instance.lat, instance.lng]}
            zIndexOffset={100 + index}
            eventHandlers={{
              click: (e) => {
                e.originalEvent?.stopPropagation();
                setSelectedInstance(instance);
              },
            }}
          >
            <Popup>
              <div className="space-y-1 p-2 w-fit m-w-sm ">
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
        ))}

        <FitBounds userLocation={userLocation} instances={visibleInstances} />

        <RoutingControl
          userLocation={userLocation}
          destination={selectedInstance ?? undefined}
        />
      </MapContainer>
    </div>
  );
}

// ✅ Wrap the map in memo
const LeafletMap = memo(LeafletMapComponent);
export default LeafletMap;

// "use client";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import L from "leaflet";
// import { useEffect, useMemo, useState, memo } from "react";
// import { Category, Instance } from "@/shared/Categories";
// import CategoryList from "@/components/CategoryList";
// import SearchBar from "./SearchBar";
// import RoutingControl from "./routingcontrol";

// // Fix Leaflet default icons
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });

// // Fit map bounds to user + instances
// function FitBounds({
//   userLocation,
//   instances,
// }: {
//   userLocation?: { lat: number; lng: number };
//   instances: Instance[];
// }) {
//   const map = useMap();
//   useEffect(() => {
//     const bounds = L.latLngBounds([]);
//     if (userLocation) bounds.extend([userLocation.lat, userLocation.lng]);
//     instances.forEach((i) => bounds.extend([i.lat, i.lng]));
//     if (bounds.isValid()) {
//       map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
//     }
//   }, [userLocation, instances, map]);

//   return null;
// }

// interface LeafletMapProps {
//   userLocation?: { lat: number; lng: number };
//   categories?: Category[];
// }

// function LeafletMapComponent({ userLocation, categories }: LeafletMapProps) {
//   // Local state here ⬇️ (not passed from parent)
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState<Category | null>(
//     null
//   );
//   const [selectedInstance, setSelectedInstance] = useState<Instance | null>(
//     null
//   );

//   // Compute visible instances
//   const visibleInstances = useMemo(() => {
//     if (selectedInstance) return [selectedInstance];
//     if (selectedCategory) return selectedCategory.instances ?? [];
//     return [];
//   }, [selectedInstance, selectedCategory]);

//   return (
//     <div className="h-full w-full relative">
//       {/* Controls */}
//       <div className="absolute top-6 left-12 right-6 z-[500] flex flex-col md:flex-row justify-between gap-6">
//         <div className="w-full md:max-w-md">
//           <SearchBar
//             value={search}
//             onChange={setSearch}
//             onSearch={(v) => console.log("Search:", v)}
//           />
//         </div>

//         <div className="w-full md:min-w-[900px]">
//           <CategoryList
//             search={search}
//             setSearch={setSearch}
//             selectedCategory={selectedCategory}
//             setSelectedCategory={setSelectedCategory}
//             setSelectedInstance={setSelectedInstance}
//           />
//         </div>
//       </div>

//       {/* Map */}
//       <MapContainer
//         center={userLocation ? [userLocation.lat, userLocation.lng] : [0, 0]}
//         zoom={16}
//         scrollWheelZoom
//         maxBounds={[
//           [-90, -180],
//           [90, 180],
//         ]}
//         className="h-full w-full"
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {userLocation && (
//           <Marker
//             position={[userLocation.lat, userLocation.lng]}
//             zIndexOffset={1000}
//           >
//             <Popup>
//               <strong>Your Location</strong>
//             </Popup>
//           </Marker>
//         )}

//         {visibleInstances.map((instance, index) => (
//           <Marker
//             key={instance.id}
//             position={[instance.lat, instance.lng]}
//             zIndexOffset={100 + index}
//             eventHandlers={{
//               click: (e) => {
//                 e.originalEvent?.stopPropagation();
//                 setSelectedInstance(instance);
//               },
//             }}
//           >
//             <Popup>
//               <div className="space-y-1 p-2 w-fit m-w-sm ">
//                 <h3 className="font-bold text-lg">{instance.name}</h3>
//                 <p>⭐ {instance.rating ?? "No rating"}</p>
//                 {instance.distance !== undefined && (
//                   <p>📍 {instance.distance} km away</p>
//                 )}
//                 {instance.estimatedTime !== undefined && (
//                   <p>⏱ ETA: {instance.estimatedTime} mins</p>
//                 )}
//               </div>
//             </Popup>
//           </Marker>
//         ))}

//         <FitBounds userLocation={userLocation} instances={visibleInstances} />

//         <RoutingControl
//           userLocation={userLocation}
//           destination={selectedInstance ?? undefined}
//         />
//       </MapContainer>
//     </div>
//   );
// }

// // ✅ Wrap the map in memo
// const LeafletMap = memo(LeafletMapComponent);
// export default LeafletMap;
