import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": {


        target: process.env.VITE_BACKEND_URL || "http://localhost:8787",
        changeOrigin: true
      }
    }
  }

});
