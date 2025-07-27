import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ временно выводим переменные явно
console.log("✅ VITE config:", process.env.VITE_API_URL);

export default defineConfig({
  plugins: [react()],
  define: {
    "import.meta.env.VITE_API_URL": JSON.stringify(process.env.VITE_API_URL),
    "import.meta.env.VITE_NOTEHUB_TOKEN": JSON.stringify(
      process.env.VITE_NOTEHUB_TOKEN
    ),
  },
});
