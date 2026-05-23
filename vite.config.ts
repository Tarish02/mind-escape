import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwind(), tsconfigPaths()],
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
