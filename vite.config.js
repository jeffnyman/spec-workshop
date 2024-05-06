import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/spec-workshop/",

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        overlord: resolve(__dirname, "pages/overlord.html"),
      },
    },
  },
});
