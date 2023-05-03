import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { esbuildDecorators } from "esbuild-decorators";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["/src/setupTest.ts"],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildDecorators()],
    },
  },
});
