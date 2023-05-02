import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import macrosPlugin from "vite-plugin-babel-macros";

// https://vitejs.dev/config/
export default defineConfig({
  // Set base: to the current directory.
  base: "/freeCodeCamp/frontend-dev-libraries/random-quote-machine/",

  plugins: [react(), macrosPlugin()],
  // Move the index.html to the src folder, and assets to their own folder in the PWD.
  root: "src",

  //Adjust build to create a new index.html in the PWD folder, and add newly created assets to dist.
  build: {
    outDir: "../",
    assetsDir: "./dist",
  },
});
