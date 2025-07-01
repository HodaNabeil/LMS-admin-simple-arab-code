import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react-vendors";
            if (id.includes("framer-motion")) return "framer";
            if (id.includes("swiper")) return "swiper";
            if (id.includes("recharts")) return "recharts";
            if (id.includes("zod")) return "zod";
            if (id.includes("axios")) return "axios";
            if (id.includes("date-fns")) return "date-fns";
            if (id.includes("react-hook-form")) return "react-hook-form";
            if (id.includes("@tanstack")) return "tanstack-query";
            if (id.includes("zustand")) return "zustand";
            return "vendor"; // باقي المكتبات
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // زيادة الحد بدلاً من 500 KB
  },
});
