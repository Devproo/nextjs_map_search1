"use client";

// utils/consolePatch.js
if (process.env.NODE_ENV === "development") {
  const originalError = console.error;

  console.error = (...args) => {
    // Helper: check if any argument contains a given substring
    const contains = (substr) =>
      args.some((arg) => String(arg).includes(substr));

    // Skip React server component errors
    if (contains("ReactServerComponentsError")) return;

    // Skip any geolocation-related errors
    if (contains("Geolocation")) return;

    // Otherwise, log as normal
    originalError(...args);
  };
}
