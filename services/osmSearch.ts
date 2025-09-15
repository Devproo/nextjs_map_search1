// services/osmSearch.ts
export interface OSMResult {
  lat: string;
  lon: string;
  display_name: string;
}

export async function fetchInstancesNearby(
  query: string,
  userLocation: { lat: number; lng: number },
  radiusDeg = 0.1,
  limit = 10
): Promise<OSMResult[]> {
  const viewbox = `${userLocation.lng - radiusDeg},${userLocation.lat + radiusDeg},${userLocation.lng + radiusDeg},${userLocation.lat - radiusDeg}`;
  const emailParam =
    typeof process !== "undefined" && process.env?.NEXT_PUBLIC_CONTACT_EMAIL
      ? `&email=${encodeURIComponent(process.env.NEXT_PUBLIC_CONTACT_EMAIL)}`
      : "";

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    query
  )}&limit=${limit}&viewbox=${viewbox}&bounded=1&accept-language=en${emailParam}`;

  const res = await fetch(url, {
    // DON'T set User-Agent from the browser — it's blocked. Referer is fine.
    headers: { Referer: typeof window !== "undefined" ? window.location.origin : "server" },
  });

  if (!res.ok) throw new Error(`Nominatim error ${res.status}`);
  const data = (await res.json()) as OSMResult[];
  return data;
}
