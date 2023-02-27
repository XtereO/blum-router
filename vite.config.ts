import { defineConfig } from "vite";

import typescript from "@rollup/plugin-typescript";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { typescriptPaths } from "rollup-plugin-typescript-paths";

export default defineConfig({
  resolve: {
    alias: {
      src: "/src",
    },
  },
  plugins: [react()],
  build: {
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      plugins: [
        typescriptPaths({
          preserveExtensions: true,
        }),
        typescript({
          sourceMap: false,
          declaration: true,
          outDir: "dist",
        }),
      ],
    },
  },
});
