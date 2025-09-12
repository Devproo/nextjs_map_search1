// "use client";

// // utils/consolePatch.js
// if (process.env.NODE_ENV === "development") {
//   const originalError = console.error;
//   console.error = (...args) => {

//     if (
//       typeof args[0] === "string" &&
//       args[0].includes("ReactServerComponentsError")
//     ) {
//       return;
//     }

//     originalError(...args);
//   };
// }

"use client";
// utils/consolePatch.js
if (process.env.NODE_ENV === "development") {
  const originalError = console.error;
  console.error = (...args) => {
    const first = args[0];
    if (
      typeof first === "string" &&
      first.includes("ReactServerComponentsError")
    ) {
      return;
    }

    // Filter out geolocation errors (string form)
    if (typeof first === "string" && first.includes("Geolocation")) {
      return;
    }

    // Filter out geolocation errors (object form with message)
    if (
      first &&
      typeof first === "object" &&
      "message" in first &&
      String(first.message).includes("Geolocation")
    ) {
      return;
    }
    originalError(...args);
  };
}
