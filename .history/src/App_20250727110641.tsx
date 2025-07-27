import React, { useEffect } from "react";

console.log("🔎 API_URL =", import.meta.env.VITE_API_URL);
console.log("🔎 TOKEN =", import.meta.env.VITE_NOTEHUB_TOKEN);

const App = () => {
  useEffect(() => {
    console.log("🟢 App loaded!");
    console.log("🔎 [useEffect] API_URL =", import.meta.env.VITE_API_URL);
    console.log("🔎 [useEffect] TOKEN =", import.meta.env.VITE_NOTEHUB_TOKEN);
  }, []);

  return (
    <div>
      <h1>NoteHub</h1>
      <button>Add Note</button>
    </div>
  );
};

export default App;
