// utils/consolePatch.js
if (process.env.NODE_ENV === "development") {
  const originalError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("ReactServerComponentsError")
    ) {
      return;
    }
    originalError(...args);
  };
}
