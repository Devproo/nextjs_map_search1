"use client";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import { useEffect } from "react";
import { Category, Instance } from "@/shared/Categories";
import CategoryList from "@/components/CategoryList";
import SearchBar from "./SearchBar";
import RoutingControl from "./routingcontrol";

// Keep your original Leaflet default icon fix
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Props for LeafletMap
interface LeafletMapProps {
  userLocation?: { lat: number; lng: number };
  categories?: Category[];
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  selectedInstance: Instance | null;
  setSelectedInstance: React.Dispatch<React.SetStateAction<Instance | null>>;
}

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

    if (bounds.isValid())
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
  }, [userLocation, instances, map]);

  return null;
}

export default function LeafletMap({
  userLocation,

  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  selectedInstance,
  setSelectedInstance,
}: LeafletMapProps) {
  // Determine which instances to display
  let visibleInstances: Instance[] = [];
  if (selectedInstance) visibleInstances = [selectedInstance];
  else if (selectedCategory)
    visibleInstances = selectedCategory.instances ?? [];

  return (
    <div className="h-full w-full relative">
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

      <MapContainer
        center={userLocation ? [userLocation.lat, userLocation.lng] : [0, 0]}
        zoom={16}
        scrollWheelZoom
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        className="h-full w-full"
        preferCanvas={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Marker */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            zIndexOffset={1000}
          >
            <Popup closeButton autoClose={false} autoPan maxWidth={300}>
              <strong>Your Location</strong>
            </Popup>
          </Marker>
        )}

        {/* Instance Markers */}
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
            <Popup closeButton autoClose={false} autoPan maxWidth={300}>
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
            </Popup>
          </Marker>
        ))}

        {/* Fit Map Bounds */}
        <FitBounds userLocation={userLocation} instances={visibleInstances} />

        {/* Routing Control */}
        <RoutingControl
          userLocation={userLocation}
          destination={selectedInstance ?? undefined}
        />
      </MapContainer>
    </div>
  );
}
